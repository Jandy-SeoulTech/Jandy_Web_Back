# 기여 가이드라인

## ❗️Pull Request 체크리스트
- [기여 가이드 라인](https://github.com/Jandy-SeoulTech/Jandy_Web_Back/edit/dev/CONTRIBUTING.md) 읽어보기
- [행동강령(Code of Conduct)](https://github.com/Jandy-SeoulTech/Jandy_Web_Back/blob/dev/CODE_OF_CONDUCT.md)읽어보기
- 자신의 변경 사항이 이 가이드라인과 일관성이 있는지 확인하기

## 컨트리뷰터가 되고 싶으시면 아래의 플로우를 따라가시면 됩니다

저희 프로젝트에 기여하시고 싶으신 분들을 위해 저희 프로젝트에 대한 자세한 설명을 아래에 적어놨습니다. 기여하시기 전 한번 읽어봐주시기 바랍니다
- [Upgle 전체 아키텍처](https://github.com/Jandy-SeoulTech/Jandy_Web_Back/wiki/Upgle-Architecture)
- [Upgle BackEnd 프로젝트 구조](https://github.com/Jandy-SeoulTech/Jandy_Web_Back/wiki/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B5%AC%EC%A1%B0)
- [Upgle Database 설계](https://github.com/Jandy-SeoulTech/Jandy_Web_Back/wiki/DB-%EC%84%A4%EA%B3%84)
- [Upgle BackEnd 환경변수](https://github.com/Jandy-SeoulTech/Jandy_Web_Back/wiki/%ED%99%98%EA%B2%BD%EB%B3%80%EC%88%98%ED%8C%8C%EC%9D%BC-%EC%84%A4%EB%AA%85)

### 코드 기여하기

Upgle을 개선하고 싶으신 분들은 저희에게 이슈 및 PR을 날려주세요! 처음인 사람을 위해 Github에서 제공하는 [About PullRequest](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)페이지가 있습니다.    
Pull Request를 작성하기 위해서는 아래의 플로우를 따라야 합니다.

1. **이슈 작성하기**   
- 저희 프로젝트를 보고 기능 추가, 개선 사항 및 버그를 발견하고 각 사항에 대해 기여를 하고 싶으시면 저희 레포지토리 issue에 각 이슈 템플릿에 맞는 이슈를 작성해주시면 됩니다.
- [이슈 작성법](https://github.com/Jandy-SeoulTech/Jandy_Web_Back/wiki/issue-%EC%9E%91%EC%84%B1%EB%B2%95) 여기에 자세한 이슈 작성법이 적혀 있습니다.
- 만약 다른 사람이 올린 이슈 링크를 보고 자신이 기여 하고 싶을때는 기존 이슈의 댓글을 통해 이슈를 올린 사람과 합의 후에 새 이슈를 만들어주시기 바랍니다!

2. **브런치 전략 및 컨벤션**
- 저희는 이슈 기반 개발 방식을 사용합니다. 위에서 이슈를 만들었다면 각 라벨에 맞는 브런치를 만들어서 개발을 진행합니다.
- [브런치 전략 및 컨벤션](https://github.com/Jandy-SeoulTech/Jandy_Web_Back/wiki/%EB%B8%8C%EB%9F%B0%EC%B9%98-%EC%A0%84%EB%9E%B5-%EB%B0%8F-%EC%BB%A8%EB%B2%A4%EC%85%98)여기에 자세한 내용이 적혀 있습니다.

3. **커밋 메시지 컨벤션**
- 저희가 지키는 커밋 메시지 컨벤션이 있습니다. 자세한 내용은 [커밋 메시지 컨벤션](https://github.com/Jandy-SeoulTech/Jandy_Web_Back/wiki/%EC%BB%A4%EB%B0%8B-%EB%A9%94%EC%8B%9C%EC%A7%80-%EC%BB%A8%EB%B2%A4%EC%85%98)과 [githook](https://github.com/Jandy-SeoulTech/Jandy_Web_Back/wiki/git-hook)을 참고해주시기 바랍니다.

4. **Pull Request 보내기**
- 개발이 완료됐다면 저희의 `dev` 브런치로 Pull Request를 보내세요! 
- 저희 프로젝트의 PR을 작성하는 방법은 [PR작성법](https://github.com/Jandy-SeoulTech/Jandy_Web_Back/wiki/PR-%EC%9E%91%EC%84%B1%EB%B2%95)
- 개발을 했을때, 저희의 기존 [API 문서](https://documenter.getpostman.com/view/14901542/Tzz7Pdio#c419310e-3512-4030-a2c4-deb178ec115a)와 비교해서 다른 부분이 있다면 `Postman`에서 해당 컬렉션을 배포 후 링크를 달아주시고 PR에 설명해주시기 바랍니다.

5. **여유를 가지고 대기해주세요!**
- 보내신 PR을 저희가 리뷰를 하는 동안 여유를 가지고 기다려주시기 바랍니다.
- API가 수정되는 경우 저희가 사용하는 기존 API 문서에도 업데이트가 될 겁니다!
- 보내준 PR이 반영이 안된다면 그 이유가 PR comment에 작성될 것 입니다. 이후 30일 동안 새로운 commit이 없다면 PR은 삭제됩니다.
- 보내준 PR이 반영된다면 메일이 보내질 겁니다!

### 기여에 대한 표준
리뷰를 위해 PR을 날리기 전에 변경사항이 아래 가이드라인을 지키는지 확인해주세요
- 보편적으로 위에서 제시한 이슈 및 브런치 전략, 커밋 컨벤션을 지키는지 확인합니다.
- 새로운 기능을 기여할때는 올바르게 코드를 제안했는지 유지보수 관점에서는 어떠한지 확인합니다.
- 완전한 새로운 기능(서비스 전반적으로)에 대한 기여는 `Upgle` 서비스의 프론트 개발자들과 합의가 필요하기 때문에 PR이 승인되는 과정이 지연될 수 있습니다.
