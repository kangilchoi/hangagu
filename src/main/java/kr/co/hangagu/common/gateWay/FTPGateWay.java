package kr.co.hangagu.common.gateWay;

import org.springframework.integration.annotation.Gateway;
import org.springframework.integration.annotation.MessagingGateway;
import org.springframework.messaging.handler.annotation.Header;

import java.io.File;

@MessagingGateway
public interface FTPGateWay {

    @Gateway(requestChannel = "toftpChannel")  void upload(File file, @Header("filename") String filename, @Header("path") String path);

}
