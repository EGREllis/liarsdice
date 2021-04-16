package net.games.liarsdice;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class LoginController {
    @RequestMapping("/signIn")
    public String signIn(@RequestParam Map<String,String> json) {
        System.err.println(String.format("Number of parameters: %1$d", json.size()));
        for (Map.Entry<String,String> entry : json.entrySet()) {
            System.err.println(String.format("%1$s : %2$s", entry.getKey(), entry.getValue()));
        }
        return "Done";
    }
}
