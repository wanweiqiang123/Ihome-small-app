/*
 * @Descripttion:
 * @version:
 * @Author: wwq
 * @Date: 2020-11-20 15:08:23
 * @LastEditors: ywl
 * @LastEditTime: 2021-03-08 14:36:59
 */
/**手机号码校验（大陆及港澳台）*/
export function phoneValidator(rule, value, callback) {
  let reg = /^[1][3-9]\d{9}$|([6|9])\d{7}$|6\d{7}$|[0][9]\d{8}$/
  if (!(reg.test(value))) {
    callback(new Error('请输入有效手机号码'))
    return false;
  } else {
    callback();
  }
}

/**字母*/
export function isLetterValidato(rule, value, callback) {
  let zmReg = /^[a-zA-Z]*$/;
  if (value != "" && !zmReg.test(value)) {
    callback(new Error('请输入英文字母'))
    return;
  } else {
    callback();
  }
}
/**大写字母*/
export function isUpperLetterValidato(rule, value, callback) {
  let zmReg = /^[A-Z]*$/;
  if (value != "" && !zmReg.test(value)) {
    callback(new Error('请输入大写英文字母'))
    return;
  } else {
    callback();
  }
}
/**小写字母*/
export function isLowerLetterValidato(rule, value, callback) {
  let zmReg = /^[a-z]*$/;
  if (value != "" && !zmReg.test(value)) {
    callback(new Error('请输入小写英文字母'))
    return;
  } else {
    callback();
  }
}


/**中文*/
export function isChineseValidato(rule, value, callback) {
  let reg = /^[\u0391-\uFFE5]+$/;
  if (value != "" && !reg.test(value)) {
    callback(new Error('请输入中文'))
    return;
  } else {
    callback();
  }
}

/**数字*/
export function isNumberValidato(rule, value, callback) {
  let reg = /^[0-9]+$/;
  if (value != "" && !reg.test(value)) {
    callback(new Error('只能输入数字！'))
    return;
  } else {
    callback();
  }
}

/**不允许空格数字*/
export function noTrim(rule, value, callback) {
  let reg = /(^\s+)|(\s+$)|\s+/g;
  if (reg.test(value)) {
    callback(new Error('请勿输入空格'))
    return;
  } else {
    callback();
  }
}

/**邮箱（必填）*/
export function emailValidato(rule, value, callback) {
  let reg = /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd0-9]+[-.])+[A-Za-zd]{2,5}$/;
  if (!reg.test(value)) {
    callback(new Error('邮箱格式有误'))
    return;
  } else {
    callback();
  }
}
/**邮箱（可空）*/
export function emailOrNullValidato(rule, value, callback) {
  if (value) {
    emailValidato(rule, value, callback);
  } else {
    callback();
  }
}
/**请勿输入特殊字符*/
export function validForbid(rule, value, callback) {
  const reg = /[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g
  if (reg.test(value)) {
    callback(new Error('请勿输入特殊字符'));
    return
  } else {
    callback();
  }
}
/**请输入有效的证件号*/
export function validIdentityCard(rule, value, callback) {
  const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
  if (!reg.test(value)) {
    callback(new Error('请输入有效的证件号'));
  } else {
    callback();
  }
}