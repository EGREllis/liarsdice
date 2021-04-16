package net.games.middle;

import gnu.getopt.Getopt;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Queue;
import java.util.concurrent.LinkedBlockingQueue;

public class ManInTheMiddle {
    public static void main(String args[]) {
        Getopt getopt = new Getopt("middle", args, "c:s:");
        int c, serverPort = 0, clientPort = 0;
        while ( (c = getopt.getopt()) != -1 ) {
            try {
                switch (c) {
                    case 'c':
                        clientPort = Integer.parseInt(getopt.getOptarg());
                        break;
                    case 's':
                        serverPort = Integer.parseInt(getopt.getOptarg());
                        break;
                    default:
                        printUsage();
                        return;
                }
            } catch (NumberFormatException nfe) {
                printUsage();
                return;
            }
        }
        System.out.println(String.format("Starting middle man server port: %1$d client port: %2$d", serverPort, clientPort));

        Queue<Integer> queue = new LinkedBlockingQueue<Integer>() {};

        Thread serverThread = new Thread(new ServerRunnable(serverPort, queue));
        serverThread.start();
        Thread clientThread = new Thread(new ServerRunnable(serverPort, queue));
        clientThread.start();
    }

    private static class ServerRunnable implements Runnable {
        private final int serverPort;
        private final Queue<Integer> queue;

        private ServerRunnable(int serverPort, Queue<Integer> queue) {
            this.serverPort = serverPort;
            this.queue = queue;
        }

        @Override
        public void run() {
            try {
                ServerSocket serverSocket = new ServerSocket(serverPort);
                Socket socket = serverSocket.accept();
                InputStream inputStream = socket.getInputStream();
                while (true) {
                    int word = inputStream.read();
                    queue.add(word);
                    System.out.println(String.valueOf(word));
                    System.out.flush();
                }
            } catch (IOException ioe) {
                throw new RuntimeException(ioe);
            }
        }
    }

    private static class ClientRunnable implements Runnable {
        private final int clientPort;
        private final Queue<Integer> queue;

        private ClientRunnable(int clientPort, Queue<Integer> queue) {
            this.clientPort = clientPort;
            this.queue = queue;
        }

        @Override
        public void run() {
            try {
                Socket socket = new Socket("localhost", clientPort);
                OutputStream outputStream = socket.getOutputStream();
                while (true) {
                    int word = queue.remove();
                    outputStream.write(word);
                    outputStream.flush();
                }
            } catch (IOException ioe) {
                throw new RuntimeException(ioe);
            }
        }
    }

    private static void printUsage() {
        System.out.println("middle -c <clientPort> -s <serverPort>\n\t<serverPort>\tThe port to listen on (integer)\n\t<clientPort>\tThe port to echo on (integer)\n\n");
    }
}
