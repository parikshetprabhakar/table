$(document).ready(function() {
        var t = $('#example').DataTable({
            language: { search: "" }
        });
        var counter = 1;
        var checkmark = '<label class="container"><input type="checkbox"><span class="checkmark"></span></label>';

        // var tableData = [
        //     { sNumber: '1', firstName: "John", lastName: 'walker', superhero: "shaktiman", email: 'jony@gmail.com', gender: 'M', age: '32' },
        // ];

        var tableData;
        var CheckTableData = JSON.parse(localStorage.getItem('tableData'))
        if (CheckTableData != null) {
            tableData = JSON.parse(localStorage.getItem('tableData'));
        } else {
            tableData = [];
            localStorage.setItem('tableData', JSON.stringify(tableData));
        }

        function tableDataAdd() {
            $.each(tableData, function(index, element) {
                t.row.add([
                    checkmark,
                    element.sNumber,
                    element.firstName,
                    element.lastName,
                    element.superhero,
                    element.email,
                    element.gender,
                    element.age,
                ]).draw(false);
                counter = element.sNumber + 1;
            });
        };
        tableDataAdd();

        $("#submitDetails").click(function() {
            t.row.add([
                checkmark,
                counter,
                $("#firstName").val(),
                $("#lastName").val(),
                $("#superhero").val(),
                $("#email").val(),
                $("#gender").val(),
                $("#age").val(),
            ]).draw(false);
            var newRecord = { sNumber: counter, firstName: $("#firstName").val(), lastName: $("#lastName").val(), superhero: $("#superhero").val(), email: $("#email").val(), gender: $("#gender").val(), age: $("#age").val() };
            var TempTable = JSON.parse(localStorage.getItem('tableData'));
            TempTable.push(newRecord);
            localStorage.setItem('tableData', JSON.stringify(TempTable));
            counter++;
            listCheckBox();
        });

        $('#deleteall').click(function() {
            var tb = $(this).attr('title');
            var sel = false;
            var ch = $('table').find('tbody input[type=checkbox]');
            var c = confirm('Continue delete?');
            if (c) {
                ch.each(function() {
                    var $this = $(this);
                    if ($this.is(':checked')) {
                        sel = true; //set to true if there is/are selected row
                        $this.parents('tr').fadeOut(function() {
                            var deletSerialNo = $(this).find("td:nth-child(2)").text();
                            deletSerialNo = deletSerialNo - 1;
                            tableData.splice(deletSerialNo, 1);
                            $this.remove(); //remove row when animation is finished
                            reserialize();
                        });
                    }
                });

                if (!sel) alert('No data selected');
            }
            return false;
        });

        function listCheckBox() {
            var checkBoxFind = $('table').find('tbody input[type=checkbox]');
            $.each(checkBoxFind, function(index, element) {
                $(element).click(function() {
                    if (element.checked) {
                        $(element).parents().closest('tr').addClass('selected');
                    } else {
                        $(element).parents().closest('tr').removeClass('selected');
                    }
                });
            });
        }

        function reserialize() {
            $.each(tableData, function(index, element) {
                element.sNumber = index + 1;
            });
            localStorage.setItem('tableData', JSON.stringify(tableData));
            $('#example').DataTable().clear();
            tableDataAdd();
        }

        listCheckBox();
    });