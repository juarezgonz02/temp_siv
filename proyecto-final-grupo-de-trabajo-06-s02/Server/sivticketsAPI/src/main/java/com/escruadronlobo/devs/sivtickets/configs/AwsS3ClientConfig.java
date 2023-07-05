package com.escruadronlobo.devs.sivtickets.configs;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AwsS3ClientConfig {

    @Value("${amazonProperties.accessKey}")
    private String awsId;

    @Value("${amazonProperties.secretKey}")
    private String awsKey;


    @Bean
    public AmazonS3 s3client() {

        BasicAWSCredentials awsCredentials = new BasicAWSCredentials(awsId, awsKey);
        String region = "us-east-1";
        AmazonS3 amazonS3Client = AmazonS3ClientBuilder.standard()
                .withRegion(Regions.fromName(region))
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();
    
        return amazonS3Client;
    }
}