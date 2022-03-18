package kr.co.hangagu.common.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;


/**
 * 임시 Transaction aop
 * 패키지 구조 설정후 pointcut 재설정
 */

@Aspect
@Component
@Order(value = 1)
public class TransactionAspect {

    private static Logger logger = LoggerFactory.getLogger(TransactionAspect.class);

    @Pointcut("( execution(* kr.co.hangagu.*.*service.*.update*(..))  " +
            "|| execution(* kr.co.hangagu.*.*service.*.insert*(..)) " +
            "|| execution(* kr.co.hangagu.*.*service.*.delete*(..)) )" )
    private void all() {} // 가명 메소드


    // todo : DB 설정 후 주석 풀기
    //@Transactional
    @Around(value = "all()" )
    public Object allAdvice(ProceedingJoinPoint pjp) throws Throwable {
        Signature sign = pjp.getSignature();
        // 해당 service 실행(insert, update)
        Object result = null;
        try {
            result = pjp.proceed();
        } catch (Exception e) {
            // 서비스 예외 발생
            e.printStackTrace();
        }

        return result;
    }

    /**
     * 서비스 예외 로그
     */
    //todo : 서비스 로직 예외 발생 로그 파일 관리(logback 설정)
    @AfterThrowing(pointcut="( execution(* kr.co.hangagu.*.*service.*.update*(..))  " +
            "|| execution(* kr.co.hangagu.*.*service.*.insert*(..)) " +
            "|| execution(* kr.co.hangagu.*.*service.*.delete*(..)) )", throwing="ex")
    public void throwAdvice(JoinPoint jp, Exception ex) {
        Object target = jp.getTarget();
        Logger logger = LoggerFactory.getLogger(target.getClass());
        logger.warn("◀◀◀◀◀◀◀◀◀◀◀◀◀◀◀◀◀◀◀◀[Service Exception Log Start]▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶");
        logger.warn("오류 발생 : ", ex);
        logger.warn("◀◀◀◀◀◀◀◀◀◀◀◀◀◀◀◀◀◀◀◀[Service Exception Log End]▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶");
    }






}
