import subprocess

DOMAIN_NAME = "*.tomaspremoli.com"
DOMAIN_BASE = "tomaspremoli.com"

EMAIL = ""

HOSTED_ZONE_ID = ""

CERTBOT_CALL = f"sudo certbot certonly --manual -d {DOMAIN_NAME} -d {DOMAIN_BASE} --email {EMAIL} --preferred-challenges dns"

# Call certbot and capture the output

# update the txt record in the route 53 hosted zone
# the domain name is the first argument, and the txt record is the second
# note that the txt record is surrounded by quotes
# this is because the txt record will likely have a semicolon in it, which
# would cause the shell to interpret the rest of the record as a comment
UPDATE_TXT_RECORD = "aws route53 change-resource-record-sets \
    --hosted-zone-id {} \
    --change-batch '{ \
        \"Changes\": [ \
            { \
                \"Action\": \"UPSERT\", \
                \"ResourceRecordSet\": { \
                    \"Name\": \"_acme-challenge.tomaspremoli.com.\", \
                    \"Type\": \"TXT\", \
                    \"TTL\": 300, \
                    \"ResourceRecords\": [ \
                        { \
                            \"Value\": \"{}\" \
                        } \
                    ] \
                } \
            } \
        ] \
    }'".format(HOSTED_ZONE_ID, "test")
    


