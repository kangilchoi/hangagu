package kr.co.hangagu.biz.common.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import kr.co.hangagu.biz.common.auth.service.JwtUserDetailsService;
import kr.co.hangagu.biz.common.auth.vo.JwtRequest;
import kr.co.hangagu.biz.common.auth.vo.JwtResponse;
import kr.co.hangagu.biz.common.auth.vo.JwtTokenUtil;

@RestController
@CrossOrigin
@RequestMapping("/auth")
public class JwtAuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    /**
     * user login api
     * @param authenticationRequest
     * @return
     * @throws Exception
     */
    @PostMapping(value = "/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
    	//1.body에서 추출된 id,pw 인증
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        //2.유저 확인
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        //3.토큰 생성
        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }
    
    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
    
}
