package com.escruadronlobo.devs.sivtickets.utils;

import java.io.*;
import java.util.Base64;
import java.util.Calendar;
import java.util.Date;

public class S3Utils {

    public static Date getTwentyYearsFromNow() {
        Calendar c = Calendar.getInstance();
        c.setTime(new Date());
        c.add(Calendar.YEAR, 20);
        Date newDate = c.getTime();
        return newDate;
    }

    public static File getImageFromBase64(String base64String, String fileName) {
        String[] strings = base64String.split(",");

        String extension = switch (strings[0]) { // check image's extension
            case "data:image/jpeg;base64" -> ".jpeg";
            case "data:image/png;base64" -> ".png";
            default -> // should write cases for more images types
                    ".jpg";
        };

        // convert base64 string to binary data
        byte[] data = Base64.getDecoder().decode(strings[1]);
        File file = new File(fileName + extension);
        try (OutputStream outputStream = new BufferedOutputStream(new FileOutputStream(file))) {
            outputStream.write(data);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return file;
    }
}
