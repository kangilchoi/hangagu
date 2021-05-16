package kr.co.hangagu.common.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import kr.co.hangagu.biz.member.member.service.MemberService;

@Configuration
@EnableWebSecurity	//Spring Security를 활성화
@EnableGlobalMethodSecurity(prePostEnabled = true)//Controller에서 특정 권한만 접근 허용. @PreAuthorize 어노테이션 사용할 수 있도록 활성화
public class SecurityConfig extends WebSecurityConfigurerAdapter{

	@Autowired
    private MemberService memberService;

	//bean등록하여  @Autowired로 사용
	@Bean
	public PasswordEncoder passwordEncoder(){
		return new BCryptPasswordEncoder();
	}

	//WebSecurity : FilterChainProxy를 생성하는 필터(Spring Security에서 해당 요청은 인증 대상에서 제외)
	@Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/css/**", "/js/**", "/img/**", "/lib/**");
    }
	//HttpSecurity : HTTP 요청에 대한 보안을 설정
	@Override
    protected void configure(HttpSecurity http) throws Exception {
		
        http.authorizeRequests()
        		.antMatchers("/admin/**").authenticated()	//인증된 사용자만 요청가능	ex : .hasRole("ADMIN")
                //.antMatchers("/member/**").authenticated()
                .antMatchers("/cart/**").authenticated()
                .antMatchers("/interestProduct/**").authenticated()
                .antMatchers("/order/**").authenticated()
                .antMatchers("/orderProduct/**").authenticated()
                
                .antMatchers("/**").permitAll()	//모든 사용자 요청가능
        		.antMatchers("/board/**").permitAll()
        		.antMatchers("/product/**").permitAll()
        		.antMatchers("/login/**").permitAll();

        //custom login & logout
        http.formLogin()
                .loginPage("/login")
                .defaultSuccessUrl("/")
                .permitAll();

        http.logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/login")
                .invalidateHttpSession(true);
        
        //권한이 없는 사용자 redirect 경로
        http.exceptionHandling().accessDeniedPage("/denied");
    }

	//AuthenticationManagerBuilder : 사용자 인증을 담당
    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(memberService).passwordEncoder(passwordEncoder());
    }

}
