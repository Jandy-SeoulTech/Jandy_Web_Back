# CONTRIBUTING

## 협업방식 요약

- 이슈 기반 개발 방식 & git flow를 따릅니다.
- 기능개발/버그픽스/리팩터링 요소가 있다면 새로운 이슈에서 알맞은 이슈 템플릿을 골라 이슈를 작성합니다.
- 만들어진 이슈는 자동으로 [Project board](https://github.com/orgs/Jandy-SeoulTech/projects)에 등록되어 진행 척도를 추적합니다.
- 만들어진 이슈 중 Assignee가 정해지지 않은 이슈는 주간 회의에서 적합한 팀원에게 할당하고, 그 외에 수시로 팀원들은 이슈를 추적하며 자신이 할 수 있는 이슈는 자신을 할당하여 해결합니다.
- 각 이슈마다 develop 브랜치에서 브랜치를 만들고, 브랜치 네이밍은 아래의 컨벤션을 따릅니다.
- 각 브랜치에서 커밋은 커밋 메시지에 해당하는 이슈 번호를 넣어야 하며, 커밋 메시지는 아래의 컨벤션을 따릅니다.
- 팀원은 개발이 완료되면 PR을 develop 브랜치에 대해 열어 내용을 PR 템플릿에 따라 작성하고, 다른 팀원 최소 1명을 reviewer로 등록합니다.
- review 요청을 받은 팀원은 PR을 리뷰해주고, reviewer의 approve를 받은 상태에서만 merge하도록 합니다.
- 핫픽스 사항/협업방식 관련 설정 등 리뷰가 필요없을 시 리뷰 없이 merge합니다.

## 이슈 작성법

1. 이슈 탭에 들어갑니다.
2. `new issue` 버튼을 클릭합니다.
3. 만드려는 이슈에 알맞은 템플릿을 선택합니다.
    - Feature Request: 새로운 기능 개발, 기존 기능 변경 등등 기능의 변경이나 추가에서 작성합니다.
    - Bug Report: 의도하지 않은 동작, 잘못된 동작 등등 버그에 대해 작성합니다.
    - Refactor Request: 기능을 수행하는 로직 변경, 이름 변경 등 기능은 그대로 두고 로직을 개선할 때 작성합니다.
4. 해당 이슈에서 템플릿에 알맞게 이슈를 작성합니다.
    - 만약 작성하려는 이슈 내용과 알맞는 템플릿이 하나도 없다면 템플릿이 아닌 빈 이슈에서 내용을 작성해주세요.
5. 이슈 본문을 다 작성하였으면 라벨을 작성합니다.
    - Feature : 새로운 기능 개발, 기존 기능 변경 등등
    - Bug : 의도하지 않은 동작, 잘못된 동작 등등
    - Refactor: 기능은 그대로 두고 로직 개선, 이름 변경 등등
    - Discussion: 팀원들의 논의가 필요한 사항에 대해 붙힙니다.
6. 이슈를 작성완료하여 Open합니다.
7. 팀원들은 새 이슈에 대해 주간 회의 혹은 수시로 확인하고, Assignee, Project, Milestone을 할당합니다.
    - Assignee: 해당 이슈를 주도적으로 해결할 팀원
    - [Project](https://github.com/orgs/Jandy-SeoulTech/projects): 이슈를 추적할 보드
    - Milestone: 해당 이슈를 해결할 기간 목표
8. PR에서 해결한 이슈를 링크하고, PR이 merge되면 링크된 이슈도 Close합니다.

## PR 작성법

1. PR을 열려는 브랜치를 설정하고 대상 브랜치는 디폴트 브랜치로 설정합니다.
2. PR 생성 화면에서, 미리 작성되어 있는 PR 템플릿의 내용을 작성합니다.
    - 개발 사항에서 간단하게 개발된/해결된 사항을 적습니다.
    - 세부 사항에서 각 항목에 대해 상세한 설명을 적습니다.
    - 설명은 코드 위주보다는 어떤 문제가 있었고 어떻게 해결하였는지 전체적인 관점에서 설명합니다.
    - 코드에 설명이 필요한 부분은 코드에 개별적으로 Comment를 작성합니다.
3. Assignee 설정
    - PR을 작성하는 자신을 Assignee로 설정합니다.
4. Reviewer 설정
    - 다른 팀원 최소 1명을 설정합니다.
5. Project, Milestone 설정
    - 해결하는 이슈와 똑같이 설정합니다.
6. Linked Issue 설정
    - PR을 작성완료하여 Open한 이후, 해결한 이슈를 모두 링크합니다.
7. Merge 워크플로우
    - 리뷰어들의 Approve를 받은 상태에서 merge합니다.
    - 리뷰어들은 코드와 description을 꼼꼼히 읽고 피드백을 진행합니다. 답변이 필요하거나 문제있다고 생각하는 코드가 있을 시에 Change Request를 제출합니다.
    - PR 작성자는 Change Request에 대해 답변 및 코드 수정 후 Push 및 re-request review 진행합니다.
    - 핫픽스 사항 및 기타 리뷰의 중요성이 크지 않은 사항은 review 없이 머지합니다.


## 브랜치 전략 및 네이밍 컨벤션

- default branch : develop
- 이슈 해결 브랜치 : (Feat/Fix/Refactor)/issue-(이슈 번호)


## 커밋메시지 컨벤션

- (Feat/Fix/Refactor): (해당 커밋에서 개발한 내용) (#이슈번호)


## git hook

- pre-commit hook : staging 파일에 대해 eslint, prettier 검사 적용 및 fix
- prepare-commit-msg : 브랜치 이름에서 Feat/Fix/Refactor 여부와 이슈번호를 추출해 커밋메시지 제목에 미리 만들어줌.
- commit-msg : 커밋 메시지에 이슈번호(ex. (#136) )가 있는지 확인

pre-commit, commit-msg 훅에서 거절되는 커밋은 커밋되지 않습니다.
