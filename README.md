> npx prisma db pull

test.env is needed for development
prod.env is needed to build production docker image

Running Dev:
> npm run dBuild
> npm run dUp

Deployement:
From dev environemnt:
> npm run pBuild
> npm run pushBuild

From prod Env:
> npm run pullBuild
> npm run pUp

PushBuildOld Method:
python3-dotnev-cli must be installed to push build using SSH
dotenv-cli must be installed globaly to use it localy.
