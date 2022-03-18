package kr.co.hangagu.biz.common.code.service;

import kr.co.hangagu.biz.common.code.vo.CodeVO;
import kr.co.hangagu.common.vo.ResultVO;

import java.util.List;

public interface CodeService {

    public ResultVO findByCdClass(String cdClass);

}
