exports.check = (detail, type) => { // applyDetailType 리턴
    let re;
    if (!detail.applyDetailType.IS_COMMON && detail.applyDetailType.IS_NATIONAL_MERIT) {
        type == 'String' ? re = '국가 유공자 후손' : re = parseInt('8');
        return re;
    } else if (!detail.applyDetailType.IS_COMMON && detail.applyDetailType.IS_NATIONAL_MERIT) {
        type == 'String' ? re = '특례입학 대상자' : re = parseInt('9');
        return re;
    }
};

exports.checkType = (str) => {
    switch (str) {
        case 'WILL':
            {
                return '졸업 예정';
                break;
            }
        case 'DONE':
            {
                return '졸업';
                break;
            }
        case 'BLACK':
            {
                return '검정고시';
                break;

            }
    }
};

exports.checkGrade = (score) => { // 성적 숫자로 들어간것 ABC로 표시
    switch (score) {
        case 1:
            {
                return 'E';
                break;
            }
        case 2:
            {
                return 'D';
                break;
            }
        case 3:
            {
                return 'C';
                break;
            }
        case 4:
            {
                return 'B';
                break;
            }
        case 5:
            {
                return 'A';
                break;
            }

    }
};

exports.getDetailType = (data, type) => {
    let re;
    if (data.applyBaseType.cause) {
        switch (data.applyBaseType.cause) {
            case 'BASIC_BENEFICIARY':
                {
                    type == 'String' ? re = '기초생활수급권자' : re = parseInt('1');
                    return re;
                }
            case 'SINGLE_PARENT':
                {
                    type == 'String' ? re = '한부모가족보호대상자' : re = parseInt('2');
                    return re;
                }
            case 'LOWER_INCOME':
                {
                    type == 'String' ? re = '차상위 계층' : re = parseInt('3');
                    return re;
                }
            case 'LOW_INCOME':
                {
                    type == 'String' ? re = '차차상위 계층 등' : re = parseInt('4');
                    return re;
                }
            case 'FROM_NORTH':
                {
                    type == 'String' ? re = '북한 이탈주민' : re = parseInt('5');
                    return re;
                }
            case 'MULTICULTURAL':
                {
                    type == 'String' ? re = '다문화가정' : re = parseInt('6');
                    return re;
                }
            case 'ETC':
                {
                    type == 'String' ? re = '그 외 대상자' : re = parseInt('7');
                    return re;
                }
        }
    } else {
        type == 'String' ? re = '일반' : re = parseInt('0');
        return re;
    }
};

exports.regionCheck = (region) => {
    if (region == 'HOME') {
        return '대전';
    } else if (region == 'AWAY') {
        return '전국';
    }
};

exports.baseType = (base) => {
    console.log(base);
    if (base == 'COMMON') {
        return '일반 전형';
    } else if (base == 'MEISTER') {
        return '마이스터 전형';
    } else if (base == 'SOCIAL') {
        return '사회 통합 전형';
    }
}