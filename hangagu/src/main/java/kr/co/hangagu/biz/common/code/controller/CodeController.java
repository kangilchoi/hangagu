package kr.co.hangagu.biz.common.code.controller;


import kr.co.hangagu.biz.common.code.service.CodeService;
import kr.co.hangagu.common.vo.ResultVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * CodeController
 * 공통 코드 관련 컨트롤러
 */
@Controller
@RequestMapping("/code")
public class CodeController {

    @Autowired
    private CodeService codeService;

    @RequestMapping(value = "/list/{cdClass}", method = RequestMethod.GET)
    public @ResponseBody
    ResultVO getCodeListByCdClass(@PathVariable("cdClass") String cdClass) {
        ResultVO resultVO = codeService.findByCdClass(cdClass);
        return resultVO;
    }
}