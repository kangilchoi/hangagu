package kr.co.hangagu.common.interceptor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Enumeration;

public class LoggerInterceptor extends HandlerInterceptorAdapter {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        StringBuffer str = new StringBuffer();
        str.append("\n==================== request info ====================");
        str.append("\nRequest URI : " + request.getRequestURI());
        Enumeration e = request.getParameterNames();
        str.append("\nparams: ");
        while (e.hasMoreElements()) {
            String name = String.valueOf(e.nextElement());
            String[] values = request.getParameterValues(name);
            for (String value : values) {
                str.append("\nname=" + name + ", value=" + value);
            }
        }
        str.append("\n======================================================");
        logger.info(str.toString());

        return super.preHandle(request, response, handler);
    }


}
