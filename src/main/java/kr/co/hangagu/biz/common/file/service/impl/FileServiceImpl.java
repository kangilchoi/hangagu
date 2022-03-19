package kr.co.hangagu.biz.common.file.service.impl;

import kr.co.hangagu.biz.common.file.dto.FileDto;
import kr.co.hangagu.biz.common.file.entity.FileEntity;
import kr.co.hangagu.biz.common.file.repository.FileRepository;
import kr.co.hangagu.biz.common.file.service.FileService;
import kr.co.hangagu.biz.common.mysql.repository.HangaguFunctionRepository;
import kr.co.hangagu.biz.member.board.entity.Board;
import kr.co.hangagu.common.constants.HangaguConstant;
import kr.co.hangagu.common.gateWay.FTPGateWay;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class FileServiceImpl implements FileService {

    @Resource
    FTPGateWay gateway;

    @Autowired
    FileRepository fileRepository;

    @Autowired
    HangaguFunctionRepository functionRepository;

    @Override
    public FileDto upload(FileDto dto) {
        FileOutputStream fos = null;
        File convFile = null;

        try {
            String fileOrgname = dto.getFile().getOriginalFilename();
            String nowDate = new SimpleDateFormat("yyyyMMddHHmmssSSS", Locale.getDefault()).format(new Date());
            String msg = fileOrgname + nowDate + "";
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(msg.getBytes());
            byte byteData[] = md.digest();

            StringBuffer hexString = new StringBuffer();
            for (int i = 0; i < byteData.length; i++) {
                String hex = Integer.toHexString(0xff & byteData[i]);
                if (hex.length() == 1) {
                    hexString.append("0");
                }
                hexString.append(hex);
            }
            String newFileNm = hexString.toString();

            /* temp 디렉토리 존재 하지 않으면 폴더 생성 */
            File tempDir = new File(HangaguConstant.FTP_TEMP);      // temp 디렉토리

            if(!tempDir.exists()){
                tempDir.mkdirs();
            }

            convFile = new File(HangaguConstant.FTP_TEMP + "/" + newFileNm);
            convFile.createNewFile();
            fos = new FileOutputStream(convFile);
            fos.write(dto.getFile().getBytes());

            String yyyymmdd = new SimpleDateFormat("yyyyMMdd", Locale.getDefault()).format(new Date());
            String basePath = "";
            String subPath = "";

            basePath = HangaguConstant.FTP_PATH + dto.getOrginDir();

            String fileFullpath = basePath + yyyymmdd;
            gateway.upload(convFile ,fileOrgname ,fileFullpath);

            String filePath = fileFullpath.replaceAll(HangaguConstant.FTP_PATH,"")+"/"+newFileNm;
            filePath = (filePath.startsWith("/") ? filePath : "/"+filePath );

            dto.setServerFilePath(filePath);
            dto.setFileOrgNm(fileOrgname);


            FileEntity fileEntity = new FileEntity();
            fileEntity.setFileKey(functionRepository.makeKeyFunction(HangaguConstant.Seq.FILE_KEY.getValue()));
            fileEntity.setServerFileNm(dto.getServerFileNm());
            fileEntity.setFileOrgNm(dto.getFileOrgNm());
            fileEntity.setServerFilePath(dto.getServerFilePath());

            dto.setFileKey(fileRepository.save(fileEntity).getFileKey());

        } catch (IOException e ) {
            e.printStackTrace();
        } catch (NoSuchAlgorithmException e ) {
            e.printStackTrace();
        } finally {
            if (convFile != null) {
                convFile.delete();
            }
            if (fos != null) {
                try {
                    fos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        return dto;
    }
}
