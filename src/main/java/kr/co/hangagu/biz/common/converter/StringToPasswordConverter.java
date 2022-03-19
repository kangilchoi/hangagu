package kr.co.hangagu.biz.common.converter;

import kr.co.hangagu.biz.common.mysql.repository.HangaguFunctionRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class StringToPasswordConverter implements AttributeConverter<String, String> {

    @Autowired
    private HangaguFunctionRepository functionRepository;

    @Override
    public String convertToDatabaseColumn(String attribute) {
        return (attribute != null) ? functionRepository.passwordFunction(attribute) : null;
    }

    @Override
    public String convertToEntityAttribute(String dbData) {
        return dbData;
    }
}
