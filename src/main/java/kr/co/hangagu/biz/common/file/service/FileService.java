package kr.co.hangagu.biz.common.file.service;


import kr.co.hangagu.biz.common.file.dto.FileDto;
import org.springframework.stereotype.Service;

/**
 * FileService
 * 공통 파일 관련 서비스
 */
public interface FileService {

    public FileDto upload(FileDto dto);
}
