#!/bin/bash

source "$PYTHONPATH/activate" && {
    
    if [[ $EB_IS_COMMAND_LEADER == "true" ]];
    then 
        # log which migrations have already been applied
        python3 manage.py showmigrations;
        
        # migrate
        python3 manage.py migrate --noinput;

        # create superuser
        python3 manage.py mysuperuser
    else 
        echo "this instance is NOT the leader";
    fi
    
}