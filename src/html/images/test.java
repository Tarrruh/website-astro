import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.Scanner;

public class test {
    public static void main(String[] args) {
        extractor("Finish what you 'start'", "First");
        extractor("I will 'Finish'", "Second");
    }
    
    public static void extractor(String input, String label) {
        String regex = "'([^']*)'";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        if (matcher.find()) {
            String extract = matcher.group(1);
            System.out.println(label + " Extracted part: " + extract);
        }
    }
}