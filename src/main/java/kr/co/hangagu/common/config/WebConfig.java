package kr.co.hangagu.common.config;

import kr.co.hangagu.common.constants.HangaguConstant;
import kr.co.hangagu.common.interceptor.LoggerInterceptor;
import org.apache.commons.net.ftp.FTPClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.integration.ftp.outbound.FtpMessageHandler;
import org.springframework.integration.ftp.session.DefaultFtpSessionFactory;
import org.springframework.messaging.MessageHandler;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Autowired
    HangaguConstant hangaguConstant;


    @Override
    public void addViewControllers(ViewControllerRegistry registry) {

    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoggerInterceptor());
    }
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
    	registry.addMapping("/**").allowedOrigins("*").allowedMethods("*").maxAge(3000);
    }

    /********************************************************
     *  FTP
     ********************************************************/
    @Bean
    public DefaultFtpSessionFactory ftpSessionFactory() {
        DefaultFtpSessionFactory factory = new DefaultFtpSessionFactory();
        factory.setControlEncoding("UTF-8");
        factory.setHost("13.209.96.119");
        factory.setPort(21);
        factory.setUsername("ec2-user");
        factory.setPassword("");            // 비밀번호 뭐지
        factory.setClientMode(FTPClient.PASSIVE_LOCAL_DATA_CONNECTION_MODE);
        return factory;
    }

    @Bean
    @ServiceActivator(inputChannel = "toftpChannel")
    public MessageHandler handler() {
        FtpMessageHandler handler = new FtpMessageHandler(ftpSessionFactory());
        handler.setAutoCreateDirectory(true);
        ExpressionParser EXPRESSION_PARSER = new SpelExpressionParser();
        handler.setRemoteDirectoryExpression(EXPRESSION_PARSER.parseExpression("headers['path']"));
        return handler;
    }

}
