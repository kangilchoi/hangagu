package kr.co.hangagu.biz.common.file.repository;

import kr.co.hangagu.biz.common.file.entity.FileEntity;
import kr.co.hangagu.biz.common.file.repository.custom.FileRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;


public interface FileRepository extends JpaRepository<FileEntity, String>, FileRepositoryCustom {

}
