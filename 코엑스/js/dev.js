/**
*	TO DO 	: 공백제거
*	Param	: strValue
*	Param	: strTrimType
*	Return	: String
*	사용예제
*		var strResult = getTrim( form.title.value, 'B');
**/
function getTrim( strValue, strTrimType ) {
	var strReturn = "";

		switch ( strTrimType.toUpperCase() ) {
		case "L"	:   strReturn = strValue.replace(/^\s+/g,"");break;//왼쪽공백제거
		case "R"	:   strReturn = strValue.replace(/\s+$/g,"");break;//오른쪽공백제거
		case "B"	:   strReturn = strValue.replace(/^\s+/g,"").replace(/\s+$/g,"");break;//양쪽공백제거
		case "A"	:   strReturn = strValue.replace(/(\s*)/g,"");break;//전체공백제거
		default		:   strReturn = strValue;break;
	}
	return strReturn;
}

/**
*	TO DO 	: 빈값여부 체크
*	Param	: strValue
*	Return	: Boolean
*	사용예제
*		if ( IsEmpty( form.title.value ) == true ) alert("입력된 값 없음");
**/
function IsEmpty( strValue ) {
	if ( strValue == null || getTrim(strValue,"A") == "" )  return true;
	return false;
}

/**
*	TO DO 	: 동일정보 체크
*	Param	: strValue1
*	Param	: strValue2
*	Return	: Boolean
*	사용예제
*		if ( IsEqual( form.pwd[0].value, form.pwd[1].value ) == false ) alert("일치하지 않음");
**/
function IsEqual( strValue1, strValue2 ) {
	if ( strValue1 != strValue2 )   return false;
	return true;
}

/**
*	TO DO 	: 입력허용길이 체크
*	Param	: strValue
*	Return	: String
*	사용예제
*		if ( IsLength( form.title.value, 2, 10 ) == false ) alert("입력길이 오류");
**/
function IsLength( strValue, intMin, intMax ) {
	var nTotalByte = getStringByte( strValue );
	if ( nTotalByte < intMin || nTotalByte > intMax )	return false;
	return true;
}

/**
*	TO DO 	: 바이트 수 구하기
*	Param	: strValue
*	Return	: Number
*	사용예제
*		var cResult = getStringByte( form.title.value );
**/
function getStringByte( strValue ) {
	var nTotalByte = 0;
	var cOneChar = "";

	if ( strValue.length == 0 ) return nTotalByte;

	for( i=0; i < strValue.length; i++ ) {
		cOneChar = strValue.charAt(i);

		if ( escape(cOneChar).length > 4 ) {
			nTotalByte += 2;
		}
		else {
			nTotalByte ++;
		}
	}
	return nTotalByte;
}

/**
*	TO DO	: 빈값여부 체크 후 포커스
*	Param	: obj (TextBox Name)
*	Return	: Boolean
*	사용예제
*	if( IsCheck(form.id, "아이디를 입력해주세요.") == false ) return;
**/
function IsCheck(obj, strMsg) {
	if ( IsEmpty(obj.value) ) {
		alert(strMsg);
		obj.focus();
		return false;
	}
	return true;
}

/**
*	TO DO 	: 체크여부 확인
*	Param	: objEle	(라디오박스/체크박스의 이름)
*	Return	: Boolean
*	사용예제
*		if ( IsChecked( form.chkData ) == false ) alert("체크된 항목 없음");
**/
function IsChecked( objEle ) {
	if ( String(objEle) != "undefined" ) {
		if ( String(objEle.length) == "undefined" )	{
			if ( objEle.checked )   return true;
		}
		else {
			for( var i=0; i<objEle.length; i++ ) {
				if ( objEle[i].checked )    return true;
			}
		}
	}
	return false;
}

/**
*	TO DO 	: 체크된 값 구하기
*	Param	: objEle	(라디오박스/체크박스의 이름)
*	Return	: String
*	사용예제
*		var cResult = getChecked_Value( form.chkData );
**/
function getChecked_Value( objEle ) {
	var strReturn = "";

	if ( String(objEle) != "undefined" ) {
		if ( String(objEle.length) == "undefined" ) {
			strReturn = objEle.value;
		}
		else {
			for( var i=0; i<objEle.length; i++ ) {
				if ( objEle[i].checked ) {
					if ( strReturn.length > 0 )   strReturn += ",";
					strReturn += objEle[i].value;
				}
			}
		}
	}
	return strReturn;
}

/**
*	TO DO 	: 체크박스 전체선택/해제
*	Param	: strEleId
*	Param	: bChecked
*	Return	: 없음
*	사용예제
*		<input type="checkbox" onClick="setChecked_All('checkData', this.checked);">
**/
function setChecked_All( strEleId, bChecked ) {
	var objEle = eval("document.getElementsByName('"+ strEleId +"')");

	bChecked = bChecked ? true : false;
	for( var i=0; i < objEle.length; i++ ) {
		objEle[i].checked = bChecked;
	}
}

/**
*	TO DO 	: 체크박스 전체선택/해제 - 컬러변경
*	Param	: strEleId
*	Param	: bChecked
*	Return	: 없음
*	사용예제
*		<input type="checkbox" onClick="setChecked_All('checkData', this.checked);">
**/
function setChecked_All_color( strEleId, bChecked, tid ) {
	var objEle = eval("document.getElementsByName('"+ strEleId +"')");

	bChecked = bChecked ? true : false;
	for( var i=0; i < objEle.length; i++ ) {
		objEle[i].checked = bChecked;
		if(bChecked == true) {
			document.getElementsByName(tid)[i].style.background	=	"#9E9E99";
		} else{
			document.getElementsByName(tid)[i].style.background	=	"";
		}
	}
}

/**
*	TO DO 	: 입력가능한 문자인지 체크
*	Param	: strValue
*	Param	: strCheckType
*	Return	: Boolean
*	사용예제
*		if ( IsValueType( form.title.value ) == false ) alert("허용되지 않은 문자열 포함");
**/
function IsValueType( strValue, strCheckType ) {
	if ( strValue.length == 0 )	return false;

	switch ( strCheckType.toUpperCase() ) {
		case "H"		: if ( strValue.search(/[^가-힣]/) != -1 )								return false;   break;  // 한글(자소허용안함)
		case "E"		: if ( strValue.search(/[^A-Za-z]/) != -1 )								return false;   break;  // 영문
		case "N"		: if ( strValue.search(/[^0-9]/) != -1 )								return false;   break;  // 숫자
		case "HE"		: if ( strValue.search(/[^가-힣A-Za-z]/) != -1 )    					return false;   break;  // 한글(자소허용안함)+영문
		case "HN"		: if ( strValue.search(/[^가-힣0-9]/) != -1 )							return false;   break;  // 한글(자소허용안함)+숫자
		case "EN"		: if ( strValue.search(/[^A-Za-z0-9]/) != -1 )           				return false;   break;  // 영문+숫자
		case "HEN"		: if ( strValue.search(/[^가-힣A-Za-z0-9]/) != -1 )						return false;   break;  // 한글(자소허용안함)+영문+숫자
		case "HENB"		: if ( strValue.search(/[^가-힣A-Za-z0-9 ]/) != -1 )  					return false;   break;  // 한글(자소허용안함)+영문+숫자+공백
		case "ENB"		: if ( strValue.search(/[^A-Za-z0-9 ]/) != -1 )  						return false;   break;  // 영문+숫자+공백
		case "N-"		: if ( strValue.search(/[^0-9-]/) != -1 )								return false;   break;  // 숫자+하이픈
        case "N,"		: if ( strValue.search(/[^0-9,]/) != -1 )								return false;   break;  // 숫자+콤마
		case "HB"		: if ( strValue.search(/[^가-힣 ]/) != -1 )								return false;   break;  // 한글(자소허용안함)+공백
		case "EB"		: if ( strValue.search(/[^A-Za-z ]/) != -1 )							return false;   break;  // 영문+공백
		case "PWD"		: if ( strValue.search(/[^A-Za-z0-9~!@#$%^&*()-\?]/) != -1 )			return false;   break;  // 영문+숫자+특문( ~!@#$%^&*()\? )
		case "SP"		: if ( strValue.search(/[^~!@#$%^&*()-\?]/) != -1 )						return false;   break;  // 특문( ~!@#$%^&*()\? )
		default			: 																		return false;	break;
	}
	return true;
}

/**
*	TO DO 	: 화면 이동
*	Param	: cUrl
*	사용예제
*	<input type="button" value="이동"	onClick="goPageMoveUrl('/')">
**/
function goPageMoveUrl( cUrl ) {
	window.location.href = cUrl;
}

/**
*	유효성 체크 (파일 확장자 체크)
* @Param	: objEle (폼 오브젝트)
* @Param	: usableFileExts	(사용가능한 확장자들)
* @Param	: cMsgTitle (유효하지 않을 시 나타낼 메세지)
* @Return	: Boolean
*	사용예제
*		if ( check_FileExt( form.fileName, 'jpg, jpeg, gif, png', '이미지 파일을 첨부하여 주십시요.' ) == false )	return;
**/
function check_FileExt(objEle, usableFileExts, cMsgTitle) {
	var fileExt = "";
	var isValidFileExt = false;

	if(IsEmpty(objEle.value)) {
		alert(cMsgTitle);
		objEle.focus();
		return false;
	}

	var filePointer = objEle.value.lastIndexOf('.');
	fileExt = objEle.value.substring(filePointer + 1, objEle.value.length);
	fileExt = fileExt.toLowerCase();

	if(IsEmpty(usableFileExts)) {
		alert("사용가능한 파일 확장자를 설정하여 주십시요.");
		return false;
	}
	else {
		var arrUsableFileExt = usableFileExts.split(",");

		for(var i = 0; i < arrUsableFileExt.length; i++) {
			if(fileExt == getTrim(arrUsableFileExt[i], 'B')) {
				isValidFileExt = true;
				break;
			}
		}

		if( !isValidFileExt) {
			alert("유효하지 않은 파일입니다. \n\n["+ usableFileExts +"]로 다시 첨부하여 주십시요.");
			objEle.focus();
			return false;
		}
	}
	return isValidFileExt;
}

/*멀티 다운로드*/
function multi_down(N) {
    var file_id = document.getElementsByName('file_id_' + N);
    var Body = document.getElementsByTagName('BODY')[0];

    for (var i = 0, j = 0; i < file_id.length; i++ , j++) {
        if (multi_down.fList[j] === undefined) {
            multi_down.fList[j] = document.createElement("IFRAME");
            multi_down.fList[j].style.display = 'none';
            Body.appendChild(multi_down.fList[j]);
        }

        multi_down.fList[j].src = multi_down.GetURL(file_id[i].value);
    }
}

multi_down.fList = [];
multi_down.GetURL = function (file_id) {
    return ajax_obj.admin_ajax + '?action=file_download_id&t_id=' + file_id;
};

//파일 다운로드
function file_down(N) {
    var Body = document.getElementsByTagName('BODY')[0];
    multi_down.fList[0] = document.createElement("IFRAME");
    multi_down.fList[0].style.display = 'none';
    Body.appendChild(multi_down.fList[0]);
    multi_down.fList[0].src = multi_down.GetURL(N);
}

/**
*	TO DO 	: textarea의 줄바꿈을 <br>로 변환
**/
function textarea_NLtoBR(str) {
	str = str.replace(/(?:\r\n|\r|\n)/g, "<br>");
	return str;
}

/**
*	TO DO 	: <br>을 textarea 줄바꿈으로 변환
**/
function textarea_BRtoNL(str) {
	str = str.replace(/<br\s*\/?>/mg,"\n");
	return str;
}

/**
*	TO DO 	: 두 날짜의 일 수 차이 구하기
*	Param	: cStartDate
*	Param	: cEndDate
*	Return	: Integer
*	사용예제
*		var nDay = getDateDiff( form.sDate.value, form.eDate.value );	// 두 날짜의 차이
**/
function getDateDiff( cStartDate, cEndDate ) {
	var sDate = cStartDate.split("-");
	var eDate = cEndDate.split("-");

	var dtSDate = new Date(sDate[0], Number(sDate[1])-1, sDate[2]);
	var dtEDate = new Date(eDate[0], Number(eDate[1])-1, eDate[2]);

	var nDiffDay = ( dtEDate.getTime() - dtSDate.getTime() ) / (1000*60*60*24);

	return nDiffDay;
}

function select_ctrl(_target) {
    var $ = jQuery;
    var _target = $(_target);
    var select_baseline = _target.closest('dl').find('ul').outerHeight() + _target.closest('dl').offset().top + 40;

    /* 셀렉트 박스 위치에 따라 노출 방향 설정 */
    if (select_baseline > $('footer').offset().top) {
        _target.closest('dl').addClass('up');
    } else {
        _target.closest('dl').removeClass('up');
    }

    if (_target.parent()[0].nodeName == 'DT' && !_target.closest('dl').hasClass('active')) {
        _target.closest('dl').addClass('active');
        _target.closest('dl').find('ul').stop().slideDown();
    } else {
        _target.closest('dl').removeClass('active').find('dt a').text(_target.text());
        _target.closest('dl').find('ul').stop().slideUp();
        _target.closest('.select_form2').find('option').prop('selected', false);
        _target.closest('.select_form2').find('option').eq(_target.parent().index()).prop('selected', true);
    }
}

function select_change(_target) {
    var $ = jQuery;
    var _target = $(_target);
    _target.closest('.select_form2').find('dt a').text(_target.children('option:selected').text());
}

function enc_aes256(key, source_str) {
    var enc_str;

    //source_str	=	jQuery("#source_enc_str").val();
    SecureAES.size(256);
    enc_str	=	SecureAES.aesEncrypt(source_str, key);

    return enc_str;
}

function dec_aes256(key, source_str) {
    var dec_str;

    //source_str	=	jQuery("#source_dec_str").val();
    SecureAES.size(256);
    dec_str	= SecureAES.aesDecrypt(source_str, key);
    return dec_str;
}

function dec_aes256_to_ex(key, source_str) {
    var dec_str;

    //source_str	=	jQuery("#source_dec_str").val();
    SecureAES.size(256);
    dec_str	= SecureAES.aesDecrypt(source_str, key);

    document.writeln(dec_str);
}


function aes_decode(enc_str, target_line) {
    var key	=   "<?php echo SECURE_AUTH_KEY?>";
    var return_str;

    if(enc_str == null || enc_str == "") {
        return_str    =    "-";
    } else{
        return_str =   dec_aes256(key, enc_str);
    }
}

//이메일 패턴 채크
function email_pattern_check(str) {
	var return_result;
	
	if(str == undefined || str == "") {
		return_result	=	false;
	} else{
		var email_regex	=	/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var email_pattern	=	email_regex.test(str);
		if(email_pattern == false) {
			return_result	=	false;
		} else{
			return_result	=	true;
		}
	}
	
	return return_result;
}

//쿠키 설정(기간지정)
//setCookie('pop', 'event0405', 7); /* pop=event0405, 7일 뒤 만료됨 */
function setCookie(name, value, exp) {
  var date = new Date();
  date.setTime(date.getTime() + exp*24*60*60*1000);
  if(exp == 0) {
		document.cookie = name + '=' + value + ';path=/';
  } else{
		document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
  }
}
//쿠키값확인
//getCookie('pop'); /* 결과: pop0405 */
function getCookie(name) {
  var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value? value[2] : null;
}
//쿠키삭제
//deleteCookie('pop');
function deleteCookie(name) {
	//삭제하려는 쿠키의 이름을 지정합니다.
	var cookieName = name;
	// 현재 날짜와 시간을 구합니다.
	var now = new Date();
	// 쿠키의 만료 날짜를 현재 시간 이전으로 설정하여 삭제합니다.
	now.setFullYear(now.getFullYear() - 1); // 1년 전으로 설정
	// 만료 날짜를 문자열로 변환합니다.
	var expires = now.toUTCString();
	// 쿠키를 삭제하기 위해 만료 시간을 설정합니다.
	document.cookie = cookieName + "=; expires=" + expires + "; path=/";
}

// URL에서 파라미터를 제거하는 함수
function removeURLParameter(url, parameter) {
    // 정규 표현식을 사용하여 파라미터를 검색 및 제거합니다.
    var regex = new RegExp("([?&])" + parameter + "=.*?(&|$)", "i");
    var result = url.replace(regex, function(match, p1, p2) {
        // 매치된 파라미터 부분을 제거하고 '&'을 처리합니다.
        if (p1 === "?" && p2 === "&") {
            return "?";
        } else {
            return "";
        }
    });

    // URL 끝에 '?' 또는 '&' 문자가 있는 경우 제거합니다.
    result = result.replace(/[\?&]$/, "");

    return result;
}

function mobile_number_check(str) {
	var m_head_number;
	var m_pattern	=	/^\d{2,3}\d{3,4}\d{4}$/;
	var return_str;
	
	m_head_number	=	str.substr(0, 3);
	
	//if(m_head_number !== "010") {
	//	return false;
	//} else{
		return_str	=	m_pattern.test(str);
		return return_str;
	//}
}

function real_mobile_number_check(str) {
	var m_head_number;
	var m_pattern	=	/^\d{3}\d{3,4}\d{4}$/;
	var return_str;
	
	m_head_number	=	str.substr(0, 3);
	
	if(m_head_number !== "010") {
		return false;
	} else{
		return_str	=	m_pattern.test(str);
		return return_str;
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//클립보드
function copy_clipboard(){
    var target_url = window.location.href;

    // clipboard API 사용
    if(navigator.clipboard !== undefined) {
		target_url	=	target_url+"&g=share";
		navigator.clipboard.writeText(target_url).then(() => {
			alert("클립보드 기능을 사용할 수 없는 브라우저 입니다.")
			return false;
        });
    } else {
		// execCommand 사용
		const input_text = document.getElementById("coex_exhibition_url");
		input_text.select();
		try {
			document.execCommand('copy');
		} catch (err) {
			alert("클립보드 복사 오류가 발생 하였습니다.\r\n다시 시도해 주새요.");
			return false;
		}
		alert("URL이 클립보드에 복사 되었습니다.");
		return false;
    }
}

//행사 검색
function search_exhibitions() {
	var ex_nounce;
	var search_keyword;
	var search_type, search_dept;
	var select_range, search_start_date, search_end_date;
	
	ex_nounce			=	jQuery("#exhibitions_nonce").val();
	search_keyword	=	jQuery("#search_keyword").val();
	search_type		=	jQuery("#search_type").val();
	select_range		=	jQuery("#select_range").val();
	search_start_date	=	jQuery("#search_start_date").val();
	search_end_date	=	jQuery("#search_end_date").val();
	search_dept		=	jQuery("#search_dept").val();
	
	document.location.href	=	"/event/full-schedules/?search_keyword="+search_keyword+"&search_type="+search_type+"&search_start_date="+search_start_date+"&search_end_date="+search_end_date+"&search_dept="+search_dept+"&sr="+select_range;
}

function set_search_type(tax_id) {
	var prev_selected;
	var new_selected;
	
	prev_selected	=	jQuery("#search_type").val();
	
	if(tax_id == undefined || tax_id == "") {
		alert("사용할 수 없는 기능입니다.");
		return false;
	} else{
		if(prev_selected == "") {
			jQuery("#search_type").val(tax_id);
		} else{
			var prev_selected_arr	=	prev_selected.split(",");
			var index	=	prev_selected_arr.indexOf(tax_id);
			
			if (index !== -1) {
				//이전 선택에 포함되어 있으면 제거
				var newArray = prev_selected_arr.filter(function(item) {
					return item !== tax_id;
				});
				new_selected	=	newArray.join();
			} else {
				//이전 선택에 없으면 추가
				prev_selected_arr.push(tax_id);
				new_selected	=	prev_selected_arr.join();
			}
			jQuery("#search_type").val(new_selected);
		}
		
		search_exhibitions();
	}
}

function set_search_dept(tax_id) {
	var prev_selected;
	var new_selected;
	
	prev_selected	=	jQuery("#search_dept").val();
	
	if(tax_id == undefined || tax_id == "") {
		alert("사용할 수 없는 기능입니다.");
		return false;
	} else{
		if(prev_selected == "") {
			jQuery("#search_dept").val(tax_id);
		} else{
			var prev_selected_arr	=	prev_selected.split(",");
			var index	=	prev_selected_arr.indexOf(tax_id);
			
			if (index !== -1) {
				//이전 선택에 포함되어 있으면 제거
				var newArray = prev_selected_arr.filter(function(item) {
					return item !== tax_id;
				});
				new_selected	=	newArray.join();
			} else {
				//이전 선택에 없으면 추가
				prev_selected_arr.push(tax_id);
				new_selected	=	prev_selected_arr.join();
			}
			jQuery("#search_dept").val(new_selected);
		}
		
		search_exhibitions();
	}
}

function click_range(range) {
	var slider = document.getElementById("input-right");
	var selectedValue = range;
	var select_range_step	=	document.getElementById("range_"+selectedValue);	
	var search_range_date	=	select_range_step.getAttribute("data-range-date");
	var print_range_date		=	search_range_date.replace(/-/g, ".");
	var current_date			=	document.getElementById("range_today").getAttribute("data-range-date");
	var print_s_range_date	=	current_date.replace(/-/g, ".");
	
	jQuery("#select_range").val(selectedValue);
	jQuery("#search_start_date").val(print_s_range_date);
	jQuery("#search_end_date").val(print_range_date);
	search_exhibitions();
}

function check_range(sf) {
	var slider = document.getElementById("input-"+sf);
	var selectedValue = slider.value;
	var select_range_step	=	document.getElementById("range_"+selectedValue);	
	var search_range_date	=	select_range_step.getAttribute("data-range-date");
	var print_range_date		=	search_range_date.replace(/-/g, ".");
	var current_date			=	document.getElementById("range_today").getAttribute("data-range-date");
	var print_s_range_date	=	current_date.replace(/-/g, ".");
	
	jQuery("#select_range").val(selectedValue);
	jQuery("#search_start_date").val(print_s_range_date);
	jQuery("#search_end_date").val(print_range_date);
	search_exhibitions();
}

function download_exhibitions() {
	var ex_nounce;
	var search_keyword;
	var search_type, search_dept;
	var select_range, search_start_date, search_end_date;
	
	ex_nounce			=	jQuery("#exhibitions_nonce").val();
	search_keyword		=	jQuery("#search_keyword").val();
	search_type			=	jQuery("#search_type").val();
	search_start_date	=	jQuery("#search_start_date").val();
	search_end_date	=	jQuery("#search_end_date").val();
	search_dept			=	jQuery("#search_dept").val();
	
	if(search_start_date == "" && search_end_date == "") {
		search_start_date	=	jQuery("#current_date").val();
		search_end_date	=	jQuery("#current_end_date").val();
	}
	
	console.log(search_start_date);
	console.log(search_end_date);
	
	var data    =   {
		"action"						:	"download_exhibitions",
		"search_keyword"		:	search_keyword,
		"search_type"			:	search_type,
		"search_start_date"	:	search_start_date,
		"search_end_date"		:	search_end_date,
		"search_dept"			:	search_dept,
	};
	jQuery.post(metabrain_dev.ajax_url, data, function(response) {
		//console.log(response);
		var result_str_arr	=	response.split("^");
		
		if(result_str_arr[0] == "MAX LIMIT DOWNLOAD COUNT") {
			alert("일정은 최대 1,000건 까지 다운로드할 수 있습니다.\n\r검색옵션을 변경해 주세요.");
			return false;
		} else if(result_str_arr[0] == "CREATE_FAIL") {
			alert("엑셀파일을 생성하지 못했습니다.\n\r다시 시도해 주세요.");
			return false;
		} else if(result_str_arr[0] == "NO DOWNLOAD RESULTS") {
			alert("다운로드 가능한 행사가 없습니다.\n\r다시 시도해 주세요.");
			return false;
		} else if(result_str_arr[0] == "CREATE_OK") {
			document.getElementById("ex_dn_btn").innerHTML	=	"<a id='ex_dn_link' href='/wp-content/uploads/data/"+result_str_arr[1]+"' download>.</a>";
			document.getElementById("ex_dn_link").click();
		} else{
			alert("사용할 수 없는 기능입니다.");
			return false;
		}
	});
}

//구글캘린더 공유하기
function share_google_calendar(cal_url, post_url) {
	if(cal_url == undefined || cal_url == "") {
		alert("사용할 수 없는 기능입니다.");
		return false;
	} else{
		setCookie("coex_exhibition_url", post_url, 0);
		var data    =   {
			"action"		:	"share_google_calendar",
			"cal_url"		:	cal_url,
		};
		jQuery.post(metabrain_dev.ajax_url, data, function(response) {
			//console.log(response);
			var result_str_arr	=	response.split("^");
			
			if(result_str_arr[0] == "Login success Google User") {
				document.getElementById("Google_Calrendar_Share_Link").innerHTML	=	"<a id='google_share_link' href='"+cal_url+"' class='CalendarIcon'><span class='ab-text'>구글캘린더</span></a>";
				document.getElementById("google_share_link").click();
				return false;
			} else if(result_str_arr[0] == "Login fail Google User") {
				alert("구글계정 로그인 정보가 없습니다.");
				return false;
			} else if(result_str_arr[0] == "Go Google Login") {
				document.location.href	=	"/google/";
				return false;
			} else{
				alert("사용할 수 없는 기능입니다.");
				return false;
			}
		});
	}
}

//이메일 도메인 선택
function change_email_domain(domain) {
	if(domain == undefined || domain == "") {
		alert("이메일 도메인을 선택해 주세요.");
		jQuery("#email_domain_list").focus();
		return false;
	} else{
			jQuery("#contact_email_domain").val(domain);
	}
}

//문의하기 인증번호 발송
function contact_certificate() {
	var email_id			=	jQuery("#contact_email_id").val();
	var email_domain	=	jQuery("#contact_email_domain").val();
	
	jQuery("#contact_certificate_send").val("None");
	
	if(email_id == undefined || email_id == "") {
		alert("이메일 아이디를 입력해 주세요.");
		jQuery("#contact_email_id").focus();
		return false;
	}
	if(email_domain == undefined || email_domain == "") {
		alert("이메일 도메인을 선택(입력)해 주세요.");
		jQuery("#email_domain_list").css("display", "block");
		jQuery("#EMAIL_DOMAIN_SECTION").css("display", "none");
		jQuery("#contact_email_domain").focus();
		return false;
	}
	//이메일 패턴 체크
	var tmp_email			=	email_id+"@"+email_domain;
	var mail_check_flag	=	email_pattern_check(tmp_email);
	if(mail_check_flag == false) {
		alert("이메일 형식에 맞게 입력해 주세요.");
		return false;
	}
	
	//버튼 비활성
	document.getElementById("CERTIFICATE_BTN").innerHTML	=	"<button type='submit' class='InputButton white'><span id='CERTIFICATE_TEXT' class='InputButton-txt'>메일 발송 중</span></button>";
	
	var data    =   {
		"action"		:	"contact_certi_send",
		"email_id"		:	email_id,
		"email_domain":	email_domain,
	};
	jQuery.post(metabrain_dev.ajax_url, data, function(response) {
		//console.log(response);
		var result_str_arr	=	response.split("^");
		
		//버튼 초기화
		document.getElementById("CERTIFICATE_BTN").innerHTML	=	"<button type='submit' class='InputButton white' onclick='contact_certificate();'><span id='CERTIFICATE_TEXT' class='InputButton-txt'>인증번호 전송</span></button>";
		
		if(result_str_arr[0] == "No Parameters") {
			alert("이메일 주소가 누락 되었습니다.");
			return false;
		} else if(result_str_arr[0] == "POST REG ERROR") {
			alert("이메일 등록 중 오류가 발생 하였습니다.\r\n다시 시도해 주세요.");
			return false;
		} else if(result_str_arr[0] == "Mail Send Fail") {
			alert("메일 발송 중 오류가 발생 하였습니다.\r\n다시 시도해 주세요.");
			return false;
		} else if(result_str_arr[0] == "Mail Send Success") {
			alert("인증메일이 발송 되었습니다.\r\n이메일로 전달된 인증번호를 입력해 주세요.");
			jQuery("#contact_certificate_send").val("Staty");
			jQuery("#contact_post_id").val(result_str_arr[1]);
			return false;
		} else{
			alert("사용할 수 없는 기능입니다.");
			return false;
		}
	});
}

//인증번호 확인
function contact_certificate_check() {
	var certi_send_flag	=	jQuery("#contact_certificate_send").val();
	var certi_post_id		=	jQuery("#contact_post_id").val();
	var certi_number		=	jQuery("#contact_certificate_number").val();
	
	if(certi_send_flag == "Staty") {
		if(certi_post_id == undefined || certi_post_id == "0") {
			alert("인증번호가 발송되지 않았습니다.");
			return false;
		}
		if(certi_number == undefined || certi_number == "") {
			alert("인증번호를 입력해 주세요.");
			jQuery("#contact_certificate_number").focus();
			return false;
		}
		
		var data    =   {
			"action"			:	"contact_certi_confirm",
			"certi_post_id"	:	certi_post_id,
			"certi_number"	:	certi_number,
		};
		jQuery.post(metabrain_dev.ajax_url, data, function(response) {
			//console.log(response);
			if(response == "No Parameters") {
				alert("필수 항목이 누락 되었습니다.");
				return false;
			} else if(response == "Certificate Confirm Fail") {
				alert("인증번호가 일치하지 않습니다.\r\n다시 시도해 주세요.");
				jQuery("#contact_certificate_number").focus();
				return false;
			} else if(response == "Certificate Confirm OK") {
				alert("인증에 성공 하였습니다.\r\n문의하기를 클릭하여 문의내용을 작성해 주세요.");
				jQuery("#contact_certificate_send").val("Success");
				return false;
			} else{
				alert("사용할 수 없는 기능입니다.");
				return false;
			}
		});
		
	} else{
		alert("인증번호를 전송 받으신 후 다시 시도해 주세요.");
		return false;
	}
}

//문의하기 페이지로 가기
function contact_form() {
	var certi_send_flag	=	jQuery("#contact_certificate_send").val();
	var certi_post_id		=	jQuery("#contact_post_id").val();
	var isChecked 			=	jQuery("#contact_agree").prop("checked");
	
	if(isChecked) {
		if(certi_send_flag == "Success") {
			setCookie("coex_contact_visitor", certi_post_id, 0);
			document.location.href	=	"/guide/contact-form/";
			return false;
		} else{
			alert("인증번호 확인이 완료되지 않았습니다.");
			return false;
		}
    } else {
		alert("개인정보 수집 및 이용에 동의해 주세요.");
		return false;
    }
}

//문의하기 구분값 선택
function contact_category_select(id, name) {
	if(id == undefined || id == "" || name == undefined || name == "") {
		alert("사용할 수 없는 기능입니다.");
		return false;
	} else{
		jQuery("#CONTACT_CAT_LIST_"+id).addClass("is-Selected");
		jQuery("#contact_category").val(name);
		jQuery("#contact_category_sub").val("");
		
		var data    =   {
			"action"	:	"get_contact_sub_category",
			"term_id"	:	id,
		};
		jQuery.post(metabrain_dev.ajax_url, data, function(response) {
			//console.log(response);
			var sub_category_list	=	"";
			var response_arr	=	response.split("=>");
			
			if(response_arr[0] == "No Parameters") {
				alert("필수 항목이 누락 되었습니다.");
				return false;
			} else if(response_arr[0] == "Empty Category") {
				jQuery("#CONTACT_SUB_CATEGORY_SECTION").css("display", "none");
				return false;
			} else if(response_arr[0] == "OK") {
				var sub_categories_arr	=	response_arr[1].split("||");
				var sub_categories_cnt	=	sub_categories_arr.length;
				
				if(sub_categories_cnt > 0) {
					sub_category_list	=	"<div class='PostSelect'><a href='javascript:void(0);' class='PostSelectText'><span id='SELECTED_SUB_CATEGORY_TEXT' class='PostSelectText-txt'>선택 하세요.</span></a><ul class='PostSelectList'>";
					
					for(var i=0; i<sub_categories_cnt; i++) {
						var sub_cat_unit	=	sub_categories_arr[i];
						var sub_cat_arr	=	sub_cat_unit.split("^");
						
						sub_category_list	=	sub_category_list+"<li class='PostSelectList-item'><a href='javascript:void(0);' class='PostSelectList-link' onclick=\"set_sub_category('"+sub_cat_arr[1]+"');\"><span class='PostSelectList-txt'>"+sub_cat_arr[1]+"</span></a></li>";
					}
					sub_category_list	=	sub_category_list+"</ul></div>";
					document.getElementById("CONTACT_SUB_CATEGORY_SELECT_LIST").innerHTML	=	sub_category_list;
					jQuery("#CONTACT_SUB_CATEGORY_SECTION").css("display", "block");
					return false;
				} else{
					jQuery("#CONTACT_SUB_CATEGORY_SECTION").css("display", "none");
					return false;
				}
			} else{
				alert("사용할 수 없는 기능입니다.");
				return false;
			}
		});
	}
}

//문의 서브카테고리 선택
function set_sub_category(name) {
	if(name == undefined || name == "") {
		alert("필수 항목이 누락 되었습니다.");
		return false;
	} else{
		jQuery("#contact_category_sub").val(name);
	}
}

//문의 등록
function contact_proc(pid) {
	if(pid == undefined || pid == "") {
		alert("인증정보가 누락 되었습니다.\r\n다시 시도해 주세요.");
		document.location.href	=	"/guide/contact/";
		return false;
	} else{
		var contact_category		=	jQuery("#contact_category").val();
		var contact_sub_category	=	jQuery("#contact_category_sub").val();
		var contact_name				=	jQuery("#contact_name").val();
		var contact_tell				=	jQuery("#contact_tell").val();
		var contact_subject			=	jQuery("#contact_subject").val();
		var contact_text				=	jQuery("#contact_text").val();
		var isChecked 					=	jQuery("#contact_agree").prop("checked");
		var contact_manager_email=	jQuery("#contact_manager_email").val();
		
		if(contact_category == "") {
			alert("문의 구분을 선택해 주세요.");
			var offset = $("#SCROLL_CATEGORY").offset();

			jQuery("html, body").animate({
				scrollTop: offset.top-100
			},400);
			return false;
		}
		//서카테고리 여부 확인
		var sub_category_displayValue = jQuery("#CONTACT_SUB_CATEGORY_SECTION").css("display");
		if(sub_category_displayValue == "block") {
			if(contact_sub_category == "") {
				alert("문의 분류를 선택해 주세요.");
				var offset = $("#CONTACT_SUB_CATEGORY_SECTION").offset();

				jQuery("html, body").animate({
					scrollTop: offset.top-100
				},400);
				return false;
			}
		}
		
		if(contact_name == "") {
			alert("고객명을 입력해 주세요.");
			jQuery("#contact_name").focus();
			return false;
		}
		
		if(contact_tell == "") {
			alert("연락처를 입력해 주세요.");
			jQuery("#contact_tell").focus();
			return false;
		} else{
			var mobile_pattern	=	mobile_number_check(contact_tell);
			if(mobile_pattern === false) {
				alert("잘못된 번호 입니다.");
				jQuery("#contact_tell").focus();
				return false;
			}
		}
		
		if(contact_subject == "") {
			alert("제목을 입력해 주세요.");
			jQuery("#contact_subject").focus();
			return false;
		}
		
		if(contact_text == "") {
			alert("문의 내용을 입력해 주세요.");
			jQuery("#contact_text").focus();
			return false;
		}

		if(isChecked === false) {
			alert("개인정보 수집 및 이용에 동의해 주세요.");
			return false;
		}
		
		document.getElementById("CONTACT_SEND_BTN").innerHTML	=	"<button type='submit' class='ContactBoxBtn-txt'><span class='ContactBoxBtn-color'>문의 등록 중</span></button>";
		
		var data    =   {
			"action"	:	"contact_form_proc",
			"pid"		:	pid,
			"contact_category"		:	contact_category,
			"contact_sub_category"	:	contact_sub_category,
			"contact_name"			:	contact_name,
			"contact_tell"				:	contact_tell,
			"contact_subject"			:	contact_subject,
			"contact_text"				:	contact_text,
			"contact_manager_email":	contact_manager_email,
		};
		jQuery.post(metabrain_dev.ajax_url, data, function(response) {
			//console.log(response);
			if(response =="No Parameters") {
				alert("필수 항목이 누락 되었습니다.");
				document.getElementById("CONTACT_SEND_BTN").innerHTML	=	"<button type='submit' class='ContactBoxBtn-txt' onclick=\"contact_proc('"+pid+"');\"><span class='ContactBoxBtn-color'>문의하기</span></button>";
				return false;
			} else if(response == "Mail Send Fail") {
				alert("메일 발송에 실패 하였습니다.");
				document.getElementById("CONTACT_SEND_BTN").innerHTML	=	"<button type='submit' class='ContactBoxBtn-txt' onclick=\"contact_proc('"+pid+"');\"><span class='ContactBoxBtn-color'>문의하기</span></button>";
				return false;
			} else if(response == "Mail Send Success") {
				alert("문의 등록이 완료 되었습니다.");
				document.location.href	=	"/";
				return false;
			} else{
				alert("사용할 수 없는 기능입니다.");
				document.getElementById("CONTACT_SEND_BTN").innerHTML	=	"<button type='submit' class='ContactBoxBtn-txt' onclick=\"contact_proc('"+pid+"');\"><span class='ContactBoxBtn-color'>문의하기</span></button>";
				return false;
			}
		});
	}
}

//공지사항 카테고리 검색 설정
function set_search_notiec_type(taxonomy) {
	if(taxonomy == undefined || taxonomy == "") {
		alert("사용할 수 없는 기능입니다.");
		return false;
	} else {
		jQuery("#search_type").val(taxonomy);
		search_notice();
		return false;
	}
}

//공지사항 검색
function search_notice() {
	var search_type		=	jQuery("#search_type").val();
	var search_keyword	=	jQuery("#search_keyword").val();
	
	document.location.href	=	"/guide/notification/coex-notice/?search_keyword="+search_keyword+"&search_type="+search_type;
}

//입찰공고 카테고리 검색 설정
function set_search_bidding_type(taxonomy) {
	if(taxonomy == undefined || taxonomy == "") {
		alert("사용할 수 없는 기능입니다.");
		return false;
	} else {
		jQuery("#search_type").val(taxonomy);
		search_bidding();
		return false;
	}
}

//입찰공고 검색
function search_bidding() {
	var search_type		=	jQuery("#search_type").val();
	var search_keyword	=	jQuery("#search_keyword").val();
	
	document.location.href	=	"/guide/notification/coex-bid/?search_keyword="+search_keyword+"&search_type="+search_type;
}

//메인 공지사항 표시
function main_view_notice() {
	
	document.getElementById("MAIN_NEWS_MORE_LINK").innerHTML	=	"<a href='/guide/notification/coex-notice/' class='MainInfoLink-link'>More</a>";
	jQuery("#MAIN_NOTICE_BTN").addClass("is-Current");
	jQuery("#MAIN_NEWS_BTN").removeClass("is-Current");
	jQuery("#MAIN_BIDDING_BTN").removeClass("is-Current");
	jQuery("#MAIN_NEWS_LIST_GROUP .MainInfoLink-link").attr('href', '/guide/notification/coex-notice/')
	
	var data    =   {
		"action"	:	"main_more_notice",
	};
	jQuery.post(metabrain_dev.ajax_url, data, function(response) {
		//console.log(response);
		if(response == "" || response == "NO LIST MORE") {
			document.getElementById("MAIN_NEWS_SECTIONS").innerHTML	=	"<li class='MainInfoContList-item a-TransUp'><div class='MainInfoItem'>검색 결과가 없습니다.</div></li>";
		} else{
			document.getElementById("MAIN_NEWS_SECTIONS").innerHTML	=	response;
		}
	});
}

//메인 뉴스 표시
function main_view_news() {
	document.getElementById("MAIN_NEWS_MORE_LINK").innerHTML	=	"<a href='/guide/news/' class='MainInfoLink-link'>More</a>";
	jQuery("#MAIN_NOTICE_BTN").removeClass("is-Current");
	jQuery("#MAIN_NEWS_BTN").addClass("is-Current");
	jQuery("#MAIN_BIDDING_BTN").removeClass("is-Current");
	
	document.getElementById("MAIN_NEWS_SECTIONS").innerHTML	=	"<iframe name='searchFrm' id='searchFrm' src='http://bs1.eyesurfer.com/BS/BSBoard/coex/MainList.aspx' width='100%' height='1000' frameborder='no' scrolling='no' title='코엑스 뉴스 리스트'></iframe>";
}

//메인 입찰정보 표시
function main_view_bidding() {
	document.getElementById("MAIN_NEWS_MORE_LINK").innerHTML	=	"<a href='/guide/notification/coex-bid/' class='MainInfoLink-link'>More</a>";
	jQuery("#MAIN_NOTICE_BTN").removeClass("is-Current");
	jQuery("#MAIN_NEWS_BTN").removeClass("is-Current");
	jQuery("#MAIN_BIDDING_BTN").addClass("is-Current");
	jQuery("#MAIN_NEWS_LIST_GROUP .MainInfoLink-link").attr('href', '/guide/notification/coex-bid/')
	
	var data    =   {
		"action"	:	"main_more_bidding",
	};
	jQuery.post(metabrain_dev.ajax_url, data, function(response) {
		//console.log(response);
		if(response == "" || response == "NO LIST MORE") {
			document.getElementById("MAIN_NEWS_SECTIONS").innerHTML	=	"<li class='MainInfoContList-item a-TransUp'><div class='MainInfoItem'>검색 결과가 없습니다.</div></li>";
		} else{
			document.getElementById("MAIN_NEWS_SECTIONS").innerHTML	=	response;
		}
	});
}

//헤더 공통 전체 검색 > 추천검색어 클릭
function set_search_keyword(keyword) {
	if(keyword == undefined || keyword == "") {
		alert("추천검색어를 선택해 주세요.");
		return false;
	} else{
		jQuery("#main_search_keyword").val(keyword);
		search_main();
	}
}

//헤더 공통 전체 검색 > 추천검색어 클릭
function search_main() {
	var s	=	jQuery("#main_search_keyword").val();
	
	if(s == undefined || s == "") {
		alert("검색어를 입력 하세요.");
		return false;
	} else{
		var encode_str		=	encodeURIComponent(s);
		document.location.href	=	"/?s="+encode_str;
	}
}

//검색페이지 추가 검색
function search_sub() {
	var s	=	jQuery("#sub_search_keyword").val();
	
	if(s == undefined || s == "") {
		alert("검색어를 입력 하세요.");
		return false;
	} else{
		var encode_str		=	encodeURIComponent(s);
		document.location.href	=	"/?s="+encode_str;
	}
}

//검색결과 페이지내 섹션 이동
function move_section(str) {
	if(str == undefined || str == "") {
		return false;
	} else{
		var offset = jQuery("#SEARCH_RESULT_"+str+"_SECTION").offset();

		jQuery("html, body").animate({
			scrollTop: offset.top-100
		},400);
		return false;
	}
}

//관심분야 행사 알림받기 신청 인증번호 받기
function get_interest_certi() {
	var user_name		=	"";
	var user_mobile	=	"";
	
	user_name	=	jQuery("#interest_user_name").val();
	user_mobile	=	jQuery("#interest_user_mobile").val();
	
	//신청정보 초기화
	jQuery("#interest_pid").val("");
	jQuery("#interest_certi_flag").val("F");
	
	if(user_name == undefined || user_name == "") {
		alert("이름을 입력해 주세요.")
		jQuery("#interest_user_name").focus();
		return false;
	}
	
	if(user_mobile == undefined || user_mobile == "") {
		alert("휴대폰 번호를 입력해 주세요.")
		jQuery("#interest_user_mobile").focus();
		return false;
	} else{
		var check_mobile	=	real_mobile_number_check(user_mobile);
		if(check_mobile == false) {
			alert("정확한 휴대폰 번호를 입력해 주세요.");
			jQuery("#interest_user_mobile").focus();
			return false;
		} else{
			//인증번호 받기 버튼 비활성
			document.getElementById("INTEREST_CERTI_BTN_01").innerHTML	=	"<button type='submit' class='InputButton'><span class='InputButton-txt'>인증번호 전송중</span></button>";
			
			//인증번호 전송
			var data    =   {
				"action"	:	"push_interest_certi_number",
				"user_name"		:	user_name,
				"user_mobile"		:	user_mobile,
			};
			jQuery.post(metabrain_dev.ajax_url, data, function(response) {
				//console.log(response);
				var result_arr	=	response.split("^0^");
				if(result_arr[0] =="No Parameters") {
					alert("필수 항목이 누락 되었습니다.");
					document.getElementById("INTEREST_CERTI_BTN_01").innerHTML	=	"<button type='submit' class='InputButton' onclick='get_interest_certi();'><span class='InputButton-txt'>인증번호 받기</span></button>";
					return false;
				} else if(result_arr[0] == "API ERROR") {
					alert("알림톡 전송중 오류가 발생 했습니다.");
					document.getElementById("INTEREST_CERTI_BTN_01").innerHTML	=	"<button type='submit' class='InputButton' onclick='get_interest_certi();'><span class='InputButton-txt'>인증번호 받기</span></button>";
					return false;
				} else if(result_arr[0] == "DB ERROR") {
					alert("인증정보 등록에 실패 하였습니다.");
					document.getElementById("INTEREST_CERTI_BTN_01").innerHTML	=	"<button type='submit' class='InputButton' onclick='get_interest_certi();'><span class='InputButton-txt'>인증번호 받기</span></button>";
					return false;
				} else if(result_arr[0] == "ALREADY REGISTERED") {
					alert("관심분야 행사 알림받기에 이미 등록 되었습니다.");
					document.location.href = "/event/full-schedules/";
					return false;
				} else if(result_arr[0] == "OK") {
					document.getElementById("INTEREST_CERTI_BTN_01").innerHTML	=	"<button type='submit' class='InputButton'><span class='InputButton-txt'>인증번호 발행완료</span></button>";
					alert("인증번호가 알림톡으로 발송 되었습니다.\r\n인증번호를 확인해 주세요.");
					jQuery("#interest_pid").val(result_arr[1]);
					jQuery("#INTEREST_CERTI_SECTION").css("display", "block");
					return false;
				} else{
					alert("사용할 수 없는 기능입니다.");
					document.getElementById("INTEREST_CERTI_BTN_01").innerHTML	=	"<button type='submit' class='InputButton' onclick='get_interest_certi();'><span class='InputButton-txt'>인증번호 받기</span></button>";
					return false;
				}
			});
		}
	}
}

//관심분야 등록 인증번호 확인
function check_interest_certi() {
	var pid	=	"";
	var w_certi_number	=	"";
	
	pid	=	jQuery("#interest_pid").val();
	w_certi_number	=	jQuery("#interest_certi_code").val();
	
	jQuery("#interest_certi_flag").val("S");
	
	if(pid == undefined || pid == "" || w_certi_number == undefined || w_certi_number == "") {
		alert("필수 항목이 누락 되었습니다.");
		return false;
	} else{
		//인증번호 확인 버튼 비활성
		document.getElementById("INTEREST_CERTI_BTN_02").innerHTML	=	"<button type='submit' class='InputButton'><span class='InputButton-txt'>인증번호 확인중</span></button>";
		
		//인증번호 확인
		var data    =   {
			"action"	:	"check_interest_certi_number",
			"pid"		:	pid,
			"num"		:	w_certi_number,
		};
		jQuery.post(metabrain_dev.ajax_url, data, function(response) {
			//console.log(response);
			if(response =="CERTIFICATE FAIL") {
				alert("인증번호가 맞지 않습니다.\r\n다시 시도해 주세요.");
				document.getElementById("INTEREST_CERTI_BTN_02").innerHTML	=	"<button type='submit' class='InputButton' onclick='check_interest_certi();'><span class='InputButton-txt'>인증번호 확인</span></button>";
				return false;
			} else if(response == "CERTIFICATE OK") {
				alert("휴대폰 인증이 성공 하였습니다.");
				document.getElementById("INTEREST_CERTI_BTN_01").innerHTML	=	"<button type='submit' class='InputButton'><span class='InputButton-txt'>인증번호 확인완료</span></button>";
				jQuery("#interest_certi_flag").val("T");
				jQuery("#INTEREST_CERTI_SECTION").css("display", "none");
				return false;
			} else{
				alert("사용할 수 없는 기능입니다.");
				document.getElementById("INTEREST_CERTI_BTN_02").innerHTML	=	"<button type='submit' class='InputButton' onclick='check_interest_certi();'><span class='InputButton-txt'>인증번호 확인</span></button>";
				return false;
			}
		});
	}
}

//관심분야 행사 알림 신청하기
function reg_interest_user() {
	var interest_group	=	"";
	var user_name		=	"";
	var user_mobile	=	"";
	var check_flag		=	"";
	var pid	=	"";
	
	//신청분야 확인
	var selectedValues = [];
    jQuery('input[name="sel_interest"]:checked').each(function() {
        selectedValues.push(jQuery(this).val());
    });
    // 선택된 값을 문자열로 변환
	interest_group	=	selectedValues.join(",");
	if(interest_group == undefined || interest_group == "") {
		alert("알림을 받으실 관심분야를 선택해 주세요.");
		return false;
	}
	
	user_name	=	jQuery("#interest_user_name").val();
	user_mobile	=	jQuery("#interest_user_mobile").val();
	check_flag	=	jQuery("#interest_certi_flag").val();
	pid	=	jQuery("#interest_pid").val();
	
	if(user_name == undefined || user_name == "") {
		alert("이름을 입력해 주세요.");
		jQuery("#interest_user_name").focus();
		return false;
	}
	if(user_mobile == undefined || user_mobile == "") {
		alert("휴대폰 번호를 입력해 주세요.");
		jQuery("#interest_user_mobile").focus();
		return false;
	}
	if(check_flag == undefined || check_flag != "T") {
		alert("휴대폰 인증이 완료되지 않았습니다.");
		return false;
	}
	if(pid == undefined || pid == "T") {
		alert("인증정보가 올바르지 않습니다.");
		return false;
	}
	
	var isChecked 	=	jQuery("#interest_agree_check_01").prop("checked");
	if(isChecked === false) {
		alert("개인정보 수집 및 이용에 동의해 주세요.");
		return false;
	}
	
	//버튼 비활성화
	document.getElementById("INTEREST_REG_BTN").innerHTML	=	"<a href='javascript:void(0);' class='PopupBtn-link'>알림 등록중</a>";
	
	var data    =   {
		"action"	:	"reg_interest_exhibitions",
		"pid"		:	pid,
		"interest_group"	:	interest_group,
		"user_name"		:	user_name,
		"user_mobile"		:	user_mobile,
	};
	jQuery.post(metabrain_dev.ajax_url, data, function(response) {
		//console.log(response);
		if(response =="No Parameters") {
			alert("필수 항목이 누락 되었습니다.");
			document.getElementById("INTEREST_REG_BTN").innerHTML	=	"<a href='javascript:void(0);' class='PopupBtn-link' onclick='reg_interest_user();'>알림 신청하기</a>";
			return false;
		} else if(response == "NOT NATCH USER NAME") {
			alert("입력하신 이름이 일치하지 않습니다.");
			document.getElementById("INTEREST_REG_BTN").innerHTML	=	"<a href='javascript:void(0);' class='PopupBtn-link' onclick='reg_interest_user();'>알림 신청하기</a>";
			return false;
		} else if(response == "NOT NATCH USER MOBILE") {
			alert("입력하신 휴대폰 번호가 일치하지 않습니다.");
			document.getElementById("INTEREST_REG_BTN").innerHTML	=	"<a href='javascript:void(0);' class='PopupBtn-link' onclick='reg_interest_user();'>알림 신청하기</a>";
			return false;
		} else if(response == "NO CERTI NUMBER") {
			alert("휴대폰 인증이 완료되지 않았습니다.");
			document.getElementById("INTEREST_REG_BTN").innerHTML	=	"<a href='javascript:void(0);' class='PopupBtn-link' onclick='reg_interest_user();'>알림 신청하기</a>";
			return false;
		} else if(response == "ALREADY REGISTERED") {
			alert("관심분야 행사 알림받기에 이미 등록 되었습니다.");
			document.location.href = "/event/full-schedules/";
			return false;
		} else if(response == "REG OK") {
			// jQuery("#interest_pid").val("");
			// jQuery("#interest_certi_flag").val("F");
			alert("관심분야 행사 알림받기 등록이 완료 되었습니다.");
			// jQuery("#EX_INTEREST_POPUP").removeClass("is-View");
			document.location.href = "/event/full-schedules/";
			return false;
		} else{
			alert("사용할 수 없는 기능입니다.");
			document.getElementById("INTEREST_REG_BTN").innerHTML	=	"<a href='javascript:void(0);' class='PopupBtn-link' onclick='reg_interest_user();'>알림 신청하기</a>";
			return false;
		}
	});
}

//관심분야 행사 알림 취소 인증번호 받기
function get_reject_interest_certi() {
	var user_name		=	"";
	var user_mobile	=	"";
	
	user_name	=	jQuery("#reject_interest_user_name").val();
	user_mobile	=	jQuery("#reject_interest_user_mobile").val();
	
	//신청정보 초기화
	jQuery("#interest_certi_flag").val("F");
	
	if(user_name == undefined || user_name == "") {
		alert("이름을 입력해 주세요.")
		jQuery("#reject_interest_user_name").focus();
		return false;
	}
	
	if(user_mobile == undefined || user_mobile == "") {
		alert("휴대폰 번호를 입력해 주세요.")
		jQuery("#reject_interest_user_mobile").focus();
		return false;
	} else{
		var check_mobile	=	real_mobile_number_check(user_mobile);
		if(check_mobile == false) {
			alert("정확한 휴대폰 번호를 입력해 주세요.");
			jQuery("#reject_interest_user_mobile").focus();
			return false;
		} else{
			//인증번호 받기 버튼 비활성
			document.getElementById("REJECT_INTEREST_CERTI_BTN_01").innerHTML	=	"<button type='submit' class='InputButton'><span class='InputButton-txt'>인증번호 전송중</span></button>";
			
			//인증번호 전송
			var data    =   {
				"action"	:	"push_interest_reject_number",
				"user_name"		:	user_name,
				"user_mobile"		:	user_mobile,
			};
			jQuery.post(metabrain_dev.ajax_url, data, function(response) {
				//console.log(response);
				var result_arr	=	response.split("^0^");
				if(result_arr[0] =="No Parameters") {
					alert("필수 항목이 누락 되었습니다.");
					document.getElementById("REJECT_INTEREST_CERTI_BTN_01").innerHTML	=	"<button type='submit' class='InputButton' onclick='get_reject_interest_certi();'><span class='InputButton-txt'>인증번호 받기</span></button>";
					return false;
				} else if(result_arr[0] == "API ERROR") {
					alert("알림톡 전송중 오류가 발생 했습니다.");
					document.getElementById("REJECT_INTEREST_CERTI_BTN_01").innerHTML	=	"<button type='submit' class='InputButton' onclick='get_reject_interest_certi();'><span class='InputButton-txt'>인증번호 받기</span></button>";
					return false;
				}  else if(result_arr[0] == "NOT REGISTERED INTEREST USER") {
					alert("관심분야 행사 알림 미신청 사용자 입니다.");
					document.location.href = "/event/full-schedules/";
					return false;
				} else if(result_arr[0] == "OK") {
					document.getElementById("REJECT_INTEREST_CERTI_BTN_01").innerHTML	=	"<button type='submit' class='InputButton'><span class='InputButton-txt'>인증번호 발행완료</span></button>";
					alert("인증번호가 알림톡으로 발송 되었습니다.\r\n인증번호를 확인해 주세요.");
					jQuery("#reject_interest_pid").val(result_arr[1]);
					jQuery("#REJECT_INTEREST_CERTI_SECTION").css("display", "block");
					return false;
				} else{
					alert("사용할 수 없는 기능입니다.");
					document.getElementById("REJECT_INTEREST_CERTI_BTN_01").innerHTML	=	"<button type='submit' class='InputButton' onclick='get_reject_interest_certi();'><span class='InputButton-txt'>인증번호 받기</span></button>";
					return false;
				}
			});
		}
	}
}

//관심분야 알림 취소 인증번호 확인
function check_reject_interest_certi() {
	var pid	=	"";
	var w_certi_number	=	"";
	
	pid	=	jQuery("#reject_interest_pid").val();
	w_certi_number	=	jQuery("#reject_interest_certi_code").val();
	
	if(pid == undefined || pid == "" || w_certi_number == undefined || w_certi_number == "") {
		alert("필수 항목이 누락 되었습니다.");
		return false;
	} else{
		//인증번호 확인 버튼 비활성
		document.getElementById("REJECT_INTEREST_CERTI_BTN_02").innerHTML	=	"<button type='submit' class='InputButton'><span class='InputButton-txt'>인증번호 확인중</span></button>";
		
		//인증번호 확인
		var data    =   {
			"action"	:	"check_reject_interest_certi_number",
			"pid"		:	pid,
			"num"		:	w_certi_number,
		};
		jQuery.post(metabrain_dev.ajax_url, data, function(response) {
			//console.log(response);
			if(response =="CERTIFICATE FAIL") {
				alert("인증번호가 맞지 않습니다.\r\n다시 시도해 주세요.");
				document.getElementById("REJECT_INTEREST_CERTI_BTN_02").innerHTML	=	"<button type='submit' class='InputButton' onclick='check_reject_interest_certi();'><span class='InputButton-txt'>인증번호 확인</span></button>";
				return false;
			} else if(response == "CERTIFICATE OK") {
				alert("휴대폰 인증이 성공 하였습니다.");
				document.getElementById("INTEREST_CERTI_BTN_01").innerHTML	=	"<button type='submit' class='InputButton'><span class='InputButton-txt'>인증번호 확인완료</span></button>";
				jQuery("#reject_interest_certi_flag").val("DT");
				jQuery("#REJECT_INTEREST_CERTI_SECTION").css("display", "none");
				return false;
			} else{
				alert("사용할 수 없는 기능입니다.");
				document.getElementById("REJECT_INTEREST_CERTI_BTN_02").innerHTML	=	"<button type='submit' class='InputButton' onclick='check_reject_interest_certi();'><span class='InputButton-txt'>인증번호 확인</span></button>";
				return false;
			}
		});
	}
}

//관심분야 행사 알림받기 취소 처리
function reject_interest_user() {
	var user_name		=	"";
	var user_mobile	=	"";
	var check_flag		=	"";
	var pid	=	"";
	
	user_name	=	jQuery("#reject_interest_user_name").val();
	user_mobile	=	jQuery("#reject_interest_user_mobile").val();
	check_flag	=	jQuery("#reject_interest_certi_flag").val();
	pid	=	jQuery("#reject_interest_pid").val();
	
	if(user_name == undefined || user_name == "") {
		alert("이름을 입력해 주세요.");
		jQuery("#reject_interest_user_name").focus();
		return false;
	}
	if(user_mobile == undefined || user_mobile == "") {
		alert("휴대폰 번호를 입력해 주세요.");
		jQuery("#reject_interest_user_mobile").focus();
		return false;
	}
	if(check_flag == undefined || check_flag != "DT") {
		alert("휴대폰 인증이 완료되지 않았습니다.");
		return false;
	}
	if(pid == undefined || pid == "") {
		alert("인증정보가 올바르지 않습니다.");
		return false;
	}
	
	var isChecked 	=	jQuery("#interest_agree_check_02").prop("checked");
	if(isChecked === false) {
		alert("개인정보 수집 및 이용에 동의해 주세요.");
		return false;
	}
	
	//버튼 비활성화
	document.getElementById("INTEREST_REJECT_BTN").innerHTML	=	"<a href='javascript:void(0);' class='PopupBtn-link'>알림 취소중</a>";
	
	var data    =   {
		"action"	:	"reject_interest_exhibitions",
		"pid"		:	pid,
		"user_name"		:	user_name,
		"user_mobile"		:	user_mobile,
	};
	jQuery.post(metabrain_dev.ajax_url, data, function(response) {
		//console.log(response);
		if(response =="No Parameters") {
			alert("필수 항목이 누락 되었습니다.");
			document.getElementById("INTEREST_REJECT_BTN").innerHTML	=	"<a href='javascript:void(0);' class='PopupBtn-link' onclick='reg_interest_user();'>알림 취소하기</a>";
			return false;
		} else if(response == "NOT NATCH USER NAME") {
			alert("입력하신 이름이 일치하지 않습니다.");
			document.getElementById("INTEREST_REJECT_BTN").innerHTML	=	"<a href='javascript:void(0);' class='PopupBtn-link' onclick='reg_interest_user();'>알림 취소하기</a>";
			return false;
		} else if(response == "NOT NATCH USER MOBILE") {
			alert("입력하신 휴대폰 번호가 일치하지 않습니다.");
			document.getElementById("INTEREST_REJECT_BTN").innerHTML	=	"<a href='javascript:void(0);' class='PopupBtn-link' onclick='reg_interest_user();'>알림 취소하기</a>";
			return false;
		} else if(response == "NO CERTI NUMBER") {
			alert("휴대폰 인증이 완료되지 않았습니다.");
			document.getElementById("INTEREST_REJECT_BTN").innerHTML	=	"<a href='javascript:void(0);' class='PopupBtn-link' onclick='reg_interest_user();'>알림 취소하기</a>";
			return false;
		} else if(response == "DELETE OK") {
			alert("관심분야 행사 알림받기 취소가 완료 되었습니다.");
			document.location.href = "/event/full-schedules/";
			return false;
		} else{
			alert("사용할 수 없는 기능입니다.");
			document.getElementById("INTEREST_REJECT_BTN").innerHTML	=	"<a href='javascript:void(0);' class='PopupBtn-link' onclick='reg_interest_user();'>알림 취소하기</a>";
			return false;
		}
	});
}