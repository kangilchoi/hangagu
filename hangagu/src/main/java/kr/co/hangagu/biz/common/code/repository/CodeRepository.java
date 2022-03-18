package kr.co.hangagu.biz.common.code.repository;

import kr.co.hangagu.biz.common.code.vo.CodeVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CodeRepository extends JpaRepository<CodeVO, Long> {


    public List<CodeVO> findByCdClass(String cdClass);

}