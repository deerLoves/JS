/**
 * 1、前端如何进行seo优化
 * a. 合理title description keywords：搜索对着三项权重逐步减小。title值强调重点；description页面内容高度概括；keywords:列举出重要关键词
 * b. 语义化HTML代码，语义化代码让搜索引擎易理解网页
 * c. 重要HTML代码放在前面：搜索引擎抓取HTML顺序是从上到下，保证重要内容一定会被抓取
 * d. 重要内容不要用js输出：爬虫不会执行js获取内容
 * e. 少用iframe: 搜索引擎不会抓取iframe中的内容
 * f. 非装饰性图片必须加alt
 * g. 提高网站速度：网站速度是搜索引擎排序的一个重要指标
 * 
 * 2、Element.classList
    const div = document.createElement('div');
    div.className = 'foo';

    // 初始状态：<div class="foo"></div>
    console.log(div.outerHTML);

    // 使用 classList API 移除、添加类值
    div.classList.remove("foo");
    div.classList.add("anotherclass");

    // <div class="anotherclass"></div>
    console.log(div.outerHTML);

    // 如果 visible 类值已存在，则移除它，否则添加它
    div.classList.toggle("visible");

    // add/remove visible, depending on test conditional, i less than 10
    div.classList.toggle("visible", i < 10 );

    console.log(div.classList.contains("foo"));

    // 添加或移除多个类值
    div.classList.add("foo", "bar", "baz");
    div.classList.remove("foo", "bar", "baz");

    // 使用展开语法添加或移除多个类值
    const cls = ["foo", "bar"];
    div.classList.add(...cls);
    div.classList.remove(...cls);

    // 将类值 "foo" 替换成 "bar"
    div.classList.replace("foo", "bar");
 */
/*
  3、通过JS去操控CSS确实是一件很麻烦的事情——他可能导致回流和重绘
  一般我们会这样做：
    document.style.background="red";
    document.style.fontSize="24";

  这样的话相当于【元素的样式被改变了两次】！整个JavaScript的性能就下来了。必要的时候（对一个元素更改多个样式）我们可以“把他们合在一起”：
    document.style.cssText="background:red;font-size:24;";
*/