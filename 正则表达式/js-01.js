/*
  1、/\s+/g和/\s/g的区别
  let name = 'ye   wen    jun';
  let ans = name.replace(/\s/g, ''); // 'yewenjun'
  let ans2 = name.replace(/\s+/g, ''); // 'yewenjun'

  let name = 'ye   wen    jun';
  let ans = name.replace(/\s/g, '#'); // "ye###wen####jun"
  let ans2 = name.replace(/\s+/g, '#'); // "ye#wen#jun"

*/