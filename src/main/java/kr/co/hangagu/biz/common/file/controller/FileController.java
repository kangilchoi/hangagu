package kr.co.hangagu.biz.common.file.controller;


import kr.co.hangagu.biz.common.file.dto.FileDto;
import kr.co.hangagu.biz.common.file.service.FileService;
import kr.co.hangagu.common.dto.ResultDto;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * FileController
 * 공통 파일 관련 컨트롤러(업로드, 다운로드, 검색 등)
 */
@Controller
@RequestMapping("/file")
public class FileController {

    @Autowired
    FileService fileService;


    @RequestMapping(value={"/upload.do"}, method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResultDto createFile(FileDto dto) throws Exception {
        dto.setOrginDir("/upload/");

        FileDto fileDto = fileService.upload(dto);

        ResultDto resultDto = new ResultDto();
        if (fileDto.getFileKey() == null) {
            resultDto.setCode("99999");
            resultDto.setMessage("파일 업로드 실패");
        } else {
            resultDto.setData(fileDto);
        }

        return resultDto;
    }

}
