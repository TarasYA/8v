layout = $('.mdl-layout-content')
$.ajax('/hw/list.json', {
    complete: (xhr, stat) => {
        if (stat != 'success') {
            console.error(stat);
            return;
        }
        list_of_predmets = JSON.parse(xhr.responseText);
        console.log(list_of_predmets.length)
        $.ajax('/card.tmp', {
            complete: (xhr, stat) => {
                if (stat != 'success') {
                    console.error(stat);
                    return;
                }
                template = xhr.responseText;
                for (var i = list_of_predmets.length - 1; i >= 0; i--) {
                    $.ajax('/hw/' + list_of_predmets[i] + '/desc', {
                        complete: (xhr, stat) => {
                            if (stat != 'success') {
                                console.error(stat)
                                return
                            }
                            description = xhr.responseText
                            $.ajax('/hw/' + list_of_predmets[i] + '/name', {
                                complete: (xhr, stat) => {
                                    if (stat != 'success') {
                                        console.error(stat)
                                        return
                                    }
                                    name = xhr.responseText
                                    card = template.replace('TYPE', list_of_predmets[i]).replace('TEXT', description).replace('NAME', name)
                                    layout.append(card)
                                }
                            })
                        }
                    })
                }
            }
        })
    }
})