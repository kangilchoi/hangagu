package kr.co.hangagu.common.util;

import java.util.Date;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.springframework.stereotype.Component;

import kr.co.hangagu.common.constants.HangaguConstant;
import kr.co.hangagu.common.constants.HangaguConstant.Code;
import kr.co.hangagu.common.response.Response;

@Component
public class MailSender {

	
	public Response sendAuthMail(String to, int authCode) {
		Response res = new Response();
		
		String username=HangaguConstant.HANGAGU_EMAIL;
		String password=HangaguConstant.HANGAGU_EMAIL_PW;
		String subject = "Hangagu 본인 인증";	

		// sets SMTP server properties
	    Properties properties = new Properties();
	    properties.put("mail.smtp.starttls.enable","true");
	    properties.put("mail.transport.protocol","smtp");
	    properties.setProperty("mail.smtp.socketFactory.class","javax.net.ssl.SSLSocketFactory");
	    properties.put("mail.smtp.host", "smtp.gmail.com");
	    properties.put("mail.smtp.port", "465");
	    properties.put("mail.smtp.auth", "true");
	    properties.put("mail.smtp.starttls.enable", "true");
	    properties.put("mail.user", username);
//	    properties.put("mail.password", password);
	    
	    StringBuilder body = new StringBuilder();
        body.append("<html> <body><h1>"+subject);
        body.append("</h1>");
        body.append("<div>인증코드 입니다. <b>");
        body.append(authCode);
        body.append("</b>");
        body.append("</div> </body></html>");


	    // creates a new session with an authenticator
	    Authenticator auth = new Authenticator() {
	        public PasswordAuthentication getPasswordAuthentication() {
	            return new PasswordAuthentication(username, password);
	        }
	    };

	    Session session = Session.getInstance(properties, auth);

	    try{
		    // creates a new e-mail message
		    Message msg = new MimeMessage(session);
		    msg.setFrom(new InternetAddress(username));
		    InternetAddress[] toAddresses = { new InternetAddress(to) };
		    msg.setRecipients(Message.RecipientType.TO, toAddresses);
		    msg.setSubject(subject);
		    msg.setSentDate(new Date());


		    // creates message part
		    MimeBodyPart messageBodyPart = new MimeBodyPart();
		    messageBodyPart.setContent(body.toString(), "text/html; charset=UTF-8");


		    // creates multi-part

		    Multipart multipart = new MimeMultipart();
		    multipart.addBodyPart(messageBodyPart);

		    // sets the multi-part as e-mail's content
		    msg.setContent(multipart);

		    // sends the e-mail
		    Transport.send(msg);

		    res.setCode(Code.SUCCESS.getKey());
			res.setData(authCode);

		} catch(Exception e){
			e.printStackTrace();
			res.setCode(Code.FAIL.getKey());
			res.setMessage("메일 발송 실패"+e);
		}

	    return res;
	}
	
}