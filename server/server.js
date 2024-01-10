const express = require('express');
const app = express();
const port = 3001;

// 解析JSON请求体
app.use(express.json());

// 处理POST请求
app.post('/api/login', (req, res) => {
    // 从请求中获取数据
    const requestData = req.body;

    // 处理数据（在这里你可以进行任何后端逻辑）
    const responseData = {
        message: 'Data received successfully!',
        data: requestData,
    };

    // 发送响应
    res.json(responseData);
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
