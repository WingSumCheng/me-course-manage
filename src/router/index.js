const Vue = require('vue');
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

const CourseList = function(resolve) {
    NProgress.start();
    return require.ensure(['@/pages/Course'], function(component) {
        var Course = require("@/pages/Course");
        var component = Course.list;
        resolve(component);
        NProgress.done();
    }, "Course");
};

const MemberTeacher = function(resolve) {
    NProgress.start();
    return require.ensure(['@/pages/Member'], function(component) {
        var Member = require("@/pages/Member");
        var component = Member.teacher;
        resolve(component);
        NProgress.done();
    }, "Member");
};

const MemberStudent = function(resolve) {
    NProgress.start();
    return require.ensure(['@/pages/Member'], function(component) {
        var Member = require("@/pages/Member");
        var component = Member.student;
        resolve(component);
        NProgress.done();
    }, "Member");
};

const routes = [
    { path: '/', redirect: '/course/list'},

    { path: '/member/teacher', component: MemberTeacher },
    { path: '/member/student', component: MemberStudent },

    { path: '/course/list', component: CourseList },
];

module.exports = new Router({
	mode: 'history',
    routes
})