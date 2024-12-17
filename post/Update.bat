@echo off
REM 切换到包含Hugo项目的目录，此处请根据实际情况修改路径
cd /d "D:\ionfeather\ionfeather-log"
REM 执行hugo命令生成静态网站文件
hugo
REM 进入public文件夹
cd public
REM 将所有文件添加到Git暂存区
git add .
REM 提交更改到本地Git仓库，提交信息为"Update"
git commit -m "Update"
REM 将本地更改推送到名为origin的远程仓库的main分支，此处假设你已经配置好远程仓库等相关设置
git push origin main
REM 暂停，以便查看执行结果，按任意键关闭窗口（可根据需求选择是否保留这行）
pause
