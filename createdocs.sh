#!/bin/bash

case $1 in
    -a )
        cd static/requestbuilder
        gulp concat
        node addmuscle.js  
        cd ../providers/lookups/
        node gentables.js
        node genfilterablelists.js
        cd ../../../
        pwd

        if [[ "$2" == "-s" ]]
            then
                hugo serve    
        fi
        ;;


    -h )
        echo "Options: '-a -s'" 
        echo "-a generates all provider tables (gentables.js) and updates the BB (addmuscle.js)'" 
        echo "-s serves gitbook to your localhost"
        echo "To display your output without generating the tables or updating the BB, don't pass in anything."
        echo "*************************************************************************************************"
        echo "-p  generates a preview of the output for the current branchh"
        cd ./ ;;
        

     * )
        cd static/requestbuilder
        gulp concat
        cd ../../
        hugo serve


esac


