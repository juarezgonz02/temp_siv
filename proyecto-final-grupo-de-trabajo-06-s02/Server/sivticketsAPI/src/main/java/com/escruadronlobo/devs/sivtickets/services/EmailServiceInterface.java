package com.escruadronlobo.devs.sivtickets.services;

import com.escruadronlobo.devs.sivtickets.models.dto.EmailDetails;

public interface EmailServiceInterface {

    // Method
    // To send a simple email
    String sendSimpleMail(EmailDetails details);

    // Method
    // To send an email with attachment
    String sendMailWithAttachment(EmailDetails details);
}