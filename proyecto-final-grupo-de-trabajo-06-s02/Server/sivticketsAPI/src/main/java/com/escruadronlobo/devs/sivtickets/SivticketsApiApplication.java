package com.escruadronlobo.devs.sivtickets;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.security.SecureRandom;
import java.util.Properties;

@SpringBootApplication
public class SivticketsApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(SivticketsApiApplication.class, args);
	}
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(5, new SecureRandom());
	}

	@Bean
	public JavaMailSender getJavaMailSender() {
		JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
		mailSender.setHost("email-smtp.us-east-1.amazonaws.com");
		//mailSender.setHost("smtp.gmail.com");
		mailSender.setPort(587);
		mailSender.setUsername("AKIATPUXF4HIKSCT44FP");
		mailSender.setPassword("BO+3KG+AfWY7Yq1u2IVAxhHlU6wDGnjf/AWKOvIXyr3c");
		/*
		mailSender.setUsername("noreply@sivtickets.fun");
		mailSender.setPassword("drgbcrxqlhskvdvr");
		* */

		System.out.println(mailSender.getPassword());
		System.out.println(mailSender.getUsername());

		Properties props = mailSender.getJavaMailProperties();
		props.put("mail.transport.protocol", "smtp");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
			props.put("mail.smtp.port", "587");
		props.put("mail.debug", "true");


		return mailSender;
	}

}
