var config = {
    // 数据请求url
    ajaxUrls: {
        getIndexData: "/website/artifacts/getMedalDataByRandom/{num}",
        // TopicAbout
        getTopicAboutData: "/website/topics",
        // topics
        getTopicsData:"/website/topics",
        // search
        searchByKeywords:'/website/search/searchByKeywords',
        suggestKeyWords: '/website/search/suggestKeyWords',
        suggestKeyWordsWithJobtag: '/website/search/suggestKeyWordsWithJobtag',
        searchByKeywordsAndJobtag: '/website/search/searchByKeywordsAndJobtag',
        searchByUsername:'/website/users/searchByUsername',
        searchByMobile:'/website/users/searchByMobile',
        searchArtifactsByNameOrTermName:'/website/search/searchArtifactsByNameOrTermName',
        searchComment:'/website/artifactComment/searchComment',
        // workFolder
        getTopicAndArtifactById:'/website/topics/getTopicAndArtifactById',
        // uploadWork
        getUrlSignature:'/getUrlSignature',
        getSTSSignature:'/getSTSSignature/:type',
        uploadFile:"/website/file/uploadFile/:type",
        // artifacts
        getArtifacts:'/website/artifacts',
        getArtifactsWithId:'/website/artifacts/:id',
        getPersonalJob: "/website/artifacts/getPersonalJob", //获取我的作品集
        getPersonalJobByUserId: "/website/artifacts/getPersonalJobByUserId", //获取别人的作品集
        // user
        createUser:'/website/users/createUser',
        getUserData:"/website/users",
        updatePwdWithEmailAndActiveCode:'/website/users/updatePwdWithEmailAndActiveCode',
        updateUserRole:'/website/users/updateUserRole',
        getCaptcha:'/getCaptcha',
        checkCaptcha:'/checkCaptcha',
        createWxUser:"/website/users/createWxUser",
        bindWeixinInfoByMobile:"/website/users/bindWeixinInfoByMobile",
        updatePwd:"/website/users/updatePwd",
        updatePwdWithMobileAndSmsCode:'/website/users/updatePwdWithMobileAndSmsCode',
        updateUserAvatarUrl:"/website/users/updateUserAvatarUrl/:id",
        //searchEngine
        transterInsertDataToES:'/website/artifacts/transterInsertDataToES',
        transterUpdateDataToES:'/website/artifacts/transterUpdateDataToES',
        //手机短信接口
        createSmsMessage:"/sms/createSmsMessage?mobile=",
        vertifySms:"/sms/vertifySms"
    },
    viewUrl:{
        workFolder:'/workFolder/:id',
        uploadWork:'/uploadWork/1?topicId=:id',
        topicsUpdate:'/topicsUpdate/:id'
    },
    default_profile: "../public/images/default_profile.jpg"
}
