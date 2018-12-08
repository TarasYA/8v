type = (new URL(location.href)).searchParams.get("t")

on_count = (type) => {
    return (xhr, stat) => {
        if (stat != 'success') {
            console.error('on_count ' + stat)
            return
        }
        n = parseInt(xhr.responseText)
        for (i = 1; i <= n; i++) {
            if (id < 10) id = '0' + id
            $('#layout').append('<img src="/hw/' + type + '/0' + id + '.png"></img>')
        }
    }
}

$.ajax('/hw/' + type + '/imgc', on_count(type))