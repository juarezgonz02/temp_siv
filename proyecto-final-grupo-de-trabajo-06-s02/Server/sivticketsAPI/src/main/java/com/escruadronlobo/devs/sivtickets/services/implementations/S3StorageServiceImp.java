package com.escruadronlobo.devs.sivtickets.services.implementations;

import java.io.File;
import java.io.IOException;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.transfer.Upload;
import com.escruadronlobo.devs.sivtickets.models.dto.req.UploadDTO;
import com.escruadronlobo.devs.sivtickets.utils.S3Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;


@Service
public class S3StorageServiceImp {

    @Autowired
    private AmazonS3 s3client;
    private static String defaultRegion = "us-east-1";

    @Value("${amazonProperties.endpointUrl}")
    private String defaultEndpointUrl;

    @Value("${amazonProperties.bucketName}")
    private String bucketName;


    public String store(UploadDTO profileUploadBean) throws Exception {

        String fileName = profileUploadBean.getName();
        String fileUrl = "";

        try {
            File file = S3Utils.getImageFromBase64(profileUploadBean.getImage(), fileName);
            fileUrl = "https://" + bucketName + "." + defaultEndpointUrl + "/" + file.getName();

            uploadFile(file.getName(), file);

            file.delete();
            System.out.print("File uploaded to S3 successfully");
        } catch (Exception e) {
            throw new Exception("Error while uploadeding the file to S3" + e.getMessage());
        }
        return fileUrl;
    }
    public String uploadFile(String keyName, File file) {
        try {
            ObjectMetadata metadata = new ObjectMetadata();

            metadata.setContentLength(file.length());
            metadata.setContentType("image/jpeg");

            
            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, file.getName(), file)
                    .withCannedAcl(CannedAccessControlList.PublicRead).withMetadata(metadata);

            System.out.println(file.length());

            s3client.putObject(putObjectRequest);

            return "File uploaded: " + keyName;
        } catch (AmazonServiceException serviceException) {
            System.out.println("AmazonServiceException: "+ serviceException.getMessage());
            throw serviceException;
        } catch (AmazonClientException clientException) {
            System.out.println("AmazonClientException Message: " + clientException.getMessage());
            throw clientException;
        }
    }

}
