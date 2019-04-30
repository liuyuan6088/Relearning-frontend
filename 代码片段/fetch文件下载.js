

// 使用fetch请求下载文件

fetch(url, option)
  .then(res => {
    // 文件下载请求 blob用于处理二进制文件
    if (res.headers.get('Content-type') === 'application/octet-stream') {
      return res.blob().then(blob => {
        // 获取文件名，需依赖后台返回结果会用不同
        const fileName = result.headers.get('Content-Disposition').split('=')[1]; 
        // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)            
        const url = window.URL.createObjectURL(blob);   
        // 模拟A标签点击下载
        const a = document.createElement('a'); 
        a.href = url;
        // 解码文件名
        a.download = decodeURIComponent(fileName); 
        document.body.appendChild(a);
        a.click();
        const timer =setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            clearTimeout(timer);
        },100);
      })
    }

    if (res.headers.get('Content-type') === 'text/html') {
      return res.text();
    }

    return res.json();
  })
  .catch(e => {
    console.log(e);
  })
