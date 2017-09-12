    exports.schoolcode = (req, res) => {
        console.log('학교 코드 조회 ');
        let database = req.app.get('database');
        let office = req.query.department; //교육청이름
        let school = req.query.schoolName; //중학교이름
        let count = 0;
        let arr = [];

        console.log(office + ' : 교육청,  ' + school + ' : 중학교 이름 ');
        try {

            if (!school && office) { //교육청만 존재
                console.log('교육청');
                database.schoolModel.findgovernment(office, (err, find) => {
                    if (err) {
                        res.writeHead(400);
                    }

                    if (find) {

                        for (var i = 0; i < find.length; i++) {
                            arr[i] = JSON.stringify(find[i])
                        }
                        res.json(arr);
                        res.end();
                    }
                })

            } else if (school && office) { //교육청, 중학교 존재
                console.log('교육청 , 중학교');
                database.schoolModel.findgovernment(office, (err, find) => {
                    if (err) {
                        res.writeHead(400);
                    }
                    if (find) {
                        for (let i = 0; i < find.length; i++) {
                            if (find[i].name === school) {
                                arr[count] = find[i];
                                count++;
                            }
                        }
                        console.log(arr);
                        res.json(arr);
                    }
                })

            } else if (school && !office) { //중학교만 있을시에
                console.log('중학교만')
                database.schoolModel.findMidleSchool(school, (err, find) => {
                    if (err) {
                        res.writeHead(400);
                    }
                    if (find) {
                        console.log(find.length)

                        for (let i = 0; i < find.length; i++) {
                            console.log(i + ' 번째 ' + find[i])
                            arr[count] = find[i];
                            count++;

                        }
                        console.log(arr + '의 정보와 ' + arr.length)
                        res.json(arr);
                    }
                })

            } else {
                res.writeHead(400);
                res.end();
            }

        } catch (err) {
            console.log(err)
            res.writeHead(400);
            res.end();
        }

    }