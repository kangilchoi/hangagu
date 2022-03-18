package kr.co.hangagu.biz.member.order.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import kr.co.hangagu.biz.common.mysql.repository.HangaguFunctionRepository;
import kr.co.hangagu.biz.member.car.dto.CartDto;
import kr.co.hangagu.biz.member.cart.entity.CartEntity;
import kr.co.hangagu.biz.member.cart.repository.CartRepository;
import kr.co.hangagu.biz.member.order.dao.OrderDao;
import kr.co.hangagu.biz.member.order.dto.OrderDto;
import kr.co.hangagu.biz.member.order.entity.OrderEntity;
import kr.co.hangagu.biz.member.order.repository.OrderRepository;
import kr.co.hangagu.biz.member.order.service.OrderService;
import kr.co.hangagu.common.constants.HangaguConstant;
import kr.co.hangagu.common.constants.HangaguConstant.Code;
import kr.co.hangagu.common.constants.PrimaryKeyType;
import kr.co.hangagu.common.dto.ResultDto;
import kr.co.hangagu.common.response.Response;
import kr.co.hangagu.common.util.UpdateUtils;

@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private HangaguFunctionRepository functionRepository;
	
	@Autowired
	private OrderDao orderDao;
	
	@Override
	public ResultDto findByMemKey(OrderDto dto, Pageable pageable) {
		ResultDto resultDto = new ResultDto();
		
		Page<OrderDto> result = orderRepository.selectOrderList(dto, pageable);
		resultDto.setData(result);
		
		return resultDto;
	}
	
	@Override
	public ResultDto findByOdKey(OrderDto dto) {
		ResultDto resultDto = new ResultDto();
		
		OrderEntity orderDto = orderRepository.selectOrderDetail(dto);
		
		resultDto.setData(orderDto);
		
		return resultDto;
	}
	
	@Override
	@Transactional
	public ResultDto save(OrderDto dto) {
		ResultDto resultDto = new ResultDto();
		
		LocalDateTime now = LocalDateTime.now();
	  
		OrderEntity ord = new OrderEntity();
		ord.setOdKey(functionRepository.makeKeyFunction(PrimaryKeyType.ORDER.getValue().toString())); 
		ord.setMemKey(dto.getMemKey());
		ord.setCartKey(dto.getCartKey());
		ord.setDeliveryPrice(dto.getDeliveryPrice());
		ord.setSalesPrice(dto.getSalesPrice()); 
		ord.setOdPrice(dto.getOdPrice());
		ord.setOdCustName(dto.getOdCustName());
		ord.setOdCustPost(dto.getOdCustPost());
		ord.setOdCustAddr(dto.getOdCustAddr());
		ord.setOdCustAddr2(dto.getOdCustAddr2());
		ord.setOdCustTel(dto.getOdCustTel());
		ord.setOdCustMobile(dto.getOdCustMobile());
		ord.setOdCustEmail(dto.getOdCustEmail());
		ord.setOdReceiverName(dto.getOdReceiverName());
		ord.setOdReceiverPost(dto.getOdReceiverPost());
		ord.setOdReceiverAddr(dto.getOdReceiverAddr());
		ord.setOdReceiverAddr2(dto.getOdReceiverAddr2());
		ord.setOdReceiverTel(dto.getOdReceiverTel());
		ord.setOdReceiverMobile(dto.getOdReceiverMobile());
		ord.setOdReceiverRemark(dto.getOdReceiverRemark());
		ord.setOdRemark(dto.getOdRemark()); 
		ord.setOdPassword(dto.getOdPassword());
		ord.setPmKey(dto.getPmKey());
		ord.setOdStatus(HangaguConstant.Oder.READY.getValue().toString());
		ord.setRegDt(now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
		ord.setModDt(now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
		
		OrderEntity newOrder = orderRepository.save(ord); 
	  
		if(newOrder == null) {
			resultDto.setData(HangaguConstant.ResponseEnum.NOT_EXIST_RESPONSE.getCode().toString());
			resultDto.setMessage(HangaguConstant.ResponseEnum.NOT_EXIST_RESPONSE.getDesc().toString()); 
		} else { 
			CartEntity crt = new CartEntity();
			crt.setCartKey(dto.getCartKey()); 
			//crt.setMemKey(dto.getMemKey());
			crt.setCartStatus(HangaguConstant.Cart.ORDER.getValue().toString());
			crt.setModDt(now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
			
			CartDto cDto = new CartDto();
			cDto.setCartKey(dto.getCartKey());
			
			CartDto existing = cartRepository.selectCartDetail(cDto);
			CartEntity ecrt = new CartEntity();
			BeanUtils.copyProperties(existing, ecrt);
			UpdateUtils.copyNonNullProperties(crt, ecrt);
			
			CartEntity newCart = cartRepository.save(ecrt);
			
			
			if(newCart == null) {
				resultDto.setData(HangaguConstant.ResponseEnum.NOT_EXIST_RESPONSE.getCode().toString());
				resultDto.setMessage(HangaguConstant.ResponseEnum.NOT_EXIST_RESPONSE.getDesc().toString()); 
			} else { 
				resultDto.setData(newCart); 
				resultDto.setMessage(HangaguConstant.ResponseEnum.SUCCESS.getDesc().toString());
			}
		
		}
		
	  return resultDto;
		
	}
	
	@Override
	public ResultDto update(OrderDto dto) {
		
		ResultDto resultDto = new ResultDto();
		
		OrderEntity orderEntity = new OrderEntity();
		
		orderEntity.setOdKey(dto.getOdKey());
		
		orderEntity.setModDt(String.valueOf(LocalDate.now()));
		orderEntity.setOdStatus(dto.getOdStatus());
		
		orderEntity.setCartKey(dto.getCartKey());
		
		OrderEntity eord = orderRepository.selectOrderDetail(dto);
		UpdateUtils.copyNonNullProperties(orderEntity, eord);
		
		OrderEntity updateOrder = orderRepository.save(eord);
		
		if(updateOrder == null) {
			resultDto.setData(HangaguConstant.ResponseEnum.NOT_EXIST_RESPONSE.getCode().toString());
			resultDto.setMessage(HangaguConstant.ResponseEnum.NOT_EXIST_RESPONSE.getDesc().toString());
		} else {
			resultDto.setData(updateOrder); 
			resultDto.setMessage(HangaguConstant.ResponseEnum.SUCCESS.getDesc().toString());
		}
		
		return resultDto;
		
	}
	
	@Override
	//마이페이지 주문 내역
	public Response myPage(String memId) {
		Response res = new Response();
		
		Optional<List<Object>> o = orderDao.myPage(memId);
		
		if(o.isPresent()) {
			res.setCode(Code.SUCCESS.getKey());
			res.setData(o.get());
		}
		
		return res;
	}
}
