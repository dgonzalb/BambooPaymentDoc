ls -l
aws s3 ls s3://$BUCKET_NAME
aws s3 rm --recursive s3://$BUCKET_NAME/$DOCS_URL_PATH
# aws s3 cp ./public s3://$BUCKET_NAME/$DOCS_URL_PATH --recursive
# aws s3 cp ./themes s3://$BUCKET_NAME/$DOCS_URL_PATH --recursive
aws s3 cp ./public/robots.txt s3://$BUCKET_NAME/ --recursive
aws s3 cp ./public s3://$BUCKET_NAME/ --recursive
aws s3 cp ./themes s3://$BUCKET_NAME/themes --recursive