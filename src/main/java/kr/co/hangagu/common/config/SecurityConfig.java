package kr.co.hangagu.common.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import kr.co.hangagu.biz.common.auth.vo.JwtAuthenticationEntryPoint;
import kr.co.hangagu.biz.common.auth.vo.JwtRequestFilter;
import kr.co.hangagu.biz.member.member.service.MemberService;

@Configuration
@EnableWebSecurity	//Spring Security를 활성화
@EnableGlobalMethodSecurity(prePostEnabled = true)//Controller에서 특정 권한만 접근 허용. @PreAuthorize 어노테이션 사용할 수 있도록 활성화
public class SecurityConfig extends WebSecurityConfigurerAdapter{

	@Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
	
	//bean등록하여  @Autowired로 사용
	@Bean
	public PasswordEncoder passwordEncoder(){
		return new BCryptPasswordEncoder();
	}
	
//	@Autowired
//    private MemberService memberService;

    @Autowired
    private UserDetailsService jwtUserDetailsService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;
    
//	@Autowired
//  private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    

	/*
	 * AuthenticationManagerBuilder : 사용자 인증을 담당
	 * desc : 일치하는 자격증명을 위해 사용자를 로드할 위치를 알수 있도록 AuthenticationManager를 구성(BCryptPasswordEncoder를 이용) 
	 */
	@Autowired
    public void configGlobal(AuthenticationManagerBuilder auth) throws Exception{
		auth.userDetailsService(jwtUserDetailsService).passwordEncoder(passwordEncoder());
//		auth.userDetailsService(memberService).passwordEncoder(passwordEncoder());
    }
	
	//HttpSecurity : HTTP 요청에 대한 보안을 설정
	@Override
    protected void configure(HttpSecurity http) throws Exception {
		
        http.authorizeRequests()
        	//인증된 사용자만 요청가능	ex : .hasRole("ADMIN")
    		.antMatchers("/admin/**").authenticated()	
            .antMatchers("/member/**").authenticated()
            .antMatchers("/cart/**").authenticated()
            .antMatchers("/interestProduct/**").authenticated()
            .antMatchers("/order/**").authenticated()
            .antMatchers("/orderProduct/**").authenticated()
                
            //모든 사용자 요청가능
            .antMatchers("/main").permitAll()	
            .antMatchers("/auth/**").permitAll()
            //.antMatchers("/member/**").permitAll()
    		//.antMatchers("/board/**").permitAll()
    		.antMatchers("/product/**").permitAll()
			.antMatchers("/board/**").permitAll()
    		.antMatchers("/component/**").permitAll()
        	.antMatchers("/authenticate").permitAll()
        	// 다른 모든 요청은 인증을 한다.
            .anyRequest().authenticated().and()
            // 상태없는 세션을 이용하며, 세션에 사용자의 상태를 저장하지 않는다.
//            .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
            .formLogin().disable()
            .headers().frameOptions().disable();
        // For CORS error
        http.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues());
        
        http.csrf().disable();
        
        // Add a filter to validate the tokens with every request
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

}
