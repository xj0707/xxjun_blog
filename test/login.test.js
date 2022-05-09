const chai = require("chai");
const chaiHttp = require("chai-http");
const apiUrl = "http://127.0.0.1:3000";

chai.should();
chai.use(chaiHttp);

// mocha 默认会找test文件夹，然后执行里面的脚本
describe("POST /api/login", () => {
    it("参数校验失败", (done) => {
        chai.request(apiUrl).post("/api/login").send({
            email: "dddd",
            password: "",
        }).end((error, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.body.should.have.property("errorCode").eq(40000);
            done();
        });
    });

    it("邮箱不存在", (done) => {
        chai.request(apiUrl).post("/api/login").send({
            email: "devpoint@qq.com",
            password: "leo_123456",
        }).end((error, response) => {
            response.should.have.status(404);
            response.body.should.be.a("object");
            response.body.should.have.property("errorCode").eq(404002);
            done();
        });
    });

    it("登录密码错误", (done) => {
        chai.request(apiUrl).post("/api/login").send({
            email: "leo1@qq.com",
            password: "dev126",
        }).end((error, response) => {
            response.should.have.status(404);
            response.body.should.be.a("object");
            response.body.should.have.property("errorCode").eq(404002);
            done();
        });
    });
    it("登录成功", (done) => {
        chai.request(apiUrl).post("/api/login").send({
            email: "leo1@qq.com",
            password: "leo_123456",
        }).end((error, response) => {
            response.should.have.status(200);
            response.body.should.be.a("object");
            response.body.should.have.property("errorCode").eq(0);
            response.body.should.have.property("data").a("object");
            // response.body.data.should.have.property("xxx");  // data里面的校验
            done();
        });
    });
});

