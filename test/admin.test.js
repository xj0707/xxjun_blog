const chai = require("chai");
const chaiHttp = require("chai-http");
const apiUrl = "http://127.0.0.1:3000";

chai.should();
chai.use(chaiHttp);
let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXAiOiIxMjcuMC4wLjEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTE4MTQ2MTYsImV4cCI6MTY1MTgxODIxNn0.Aw2nl_ZFI36wC_dsndhY9Cm71nZW-HIMrlSQbcV3Mi8"

// mocha 默认会找test文件夹，然后执行里面的脚本
describe("admin接口测试", () => {
    describe("POST /api/admin/register", () => {
        it("token问题：丢失，错误，过期", (done) => {
            chai.request(apiUrl).post("/api/admin/register").set('authorization', token + 'cuowu').send({
                email: "dddd",
                password: "",
            }).end((error, response) => {
                response.should.have.status(403);
                response.body.should.be.a("object");
                done();
            });
        });
        it("参数校验失败", (done) => {
            chai.request(apiUrl).post("/api/admin/register").set('authorization', token).send({
                email: "dddd",
                password: "",
            }).end((error, response) => {
                response.should.have.status(400);
                response.body.should.be.a("object");
                response.body.should.have.property("errorCode").eq(40000);
                done();
            });
        });
        it("注册成功", (done) => {
            chai.request(apiUrl).post("/api/admin/register").set('authorization', token).send({
                email: Math.round(Math.random() * 1000) + "leo11@qq.com",
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
        it("邮箱已存在", (done) => {
            chai.request(apiUrl).post("/api/admin/register").set('authorization', token).send({
                email: "leo11@qq.com",
                password: "leo_123456",
            }).end((error, response) => {
                response.should.have.status(403);
                response.body.should.be.a("object");
                response.body.should.have.property("errorCode").eq(40300);
                done();
            });
        });
    });
    describe("GET /api/admin/list", () => {
        it("token问题：丢失，错误，过期", (done) => {
            chai.request(apiUrl).get("/api/admin/list").set('authorization', token + 'cuowu').send().end((error, response) => {
                response.should.have.status(403);
                response.body.should.be.a("object");
                done();
            });
        });
        it("查询成功", (done) => {
            chai.request(apiUrl).get("/api/admin/list").set('authorization', token).send().end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a("object");
                response.body.should.have.property("errorCode").eq(0);
                response.body.should.have.property("data").a("array");
                // response.body.data.should.have.property("xxx");  // data里面的校验
                done();
            });
        });
    });
})

