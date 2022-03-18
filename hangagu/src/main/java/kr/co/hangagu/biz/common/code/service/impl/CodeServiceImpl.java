package kr.co.hangagu.biz.common.code.service.impl;

import kr.co.hangagu.biz.common.code.repository.CodeRepository;
import kr.co.hangagu.biz.common.code.service.CodeService;
import kr.co.hangagu.biz.common.code.vo.CodeVO;
import kr.co.hangagu.common.vo.ResultVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * CodeService
 * 공통 코드 관련 서비스
 */
@Service
public class CodeServiceImpl implements CodeService {

    @Autowired
    private CodeRepository codeRepository;

    @Override
    public ResultVO findByCdClass(String cdClass) {
        ResultVO resultVO = new ResultVO();
        List<CodeVO> list = codeRepository.findByCdClass(cdClass);

        if(null == list || list.isEmpty()) {
            resultVO.setCode("9999");
            resultVO.setMessage("데이터 없음");
        } else {
            resultVO.setData(list);
        }

        return resultVO;
    }
}

