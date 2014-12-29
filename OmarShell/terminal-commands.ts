var myCommands;

var commandExecution = function (command, term) {
    //var splittedCommand = command.split(" ");
    myCommands.callCommand(term, command);
    window.scrollTo(0, term.height());
}

var thisIsGreet = function (term,
     callback){    
    return "\
                           __________\n\
 dHHHHHHHHHb              //        /\n\
dHHHHHHHHHHHb            //        /\n\
HHHHH\" \"HHHHH           //    /\\   \\\n\
HHHH     HHHH          //    /_\\\\   \\\n\
HHHH     HHHH         //             \\\n\
HHHHH. .HHHHH        //     ______    \\\n\
\"HHHHHHHHHHH\"       //     /     \\\\    \\\n\
 \"HHHHHHHHH\"  <X>  //_____/       \\\\____\\\n\
\n\
Welcome to Omar Shell, I am Omar Ajerray and this is my little hackjob of an attempt to put out something unique as a website. The backend is still missing, and there are only a few supported commands, but feel free to play around.\n\
Find more about me online on my LinkedIn profile <http://uk.linkedin.com/in/omarajerray>\n\
This terminal uses <http://terminal.jcubic.pl> and everything else I coded myself with a healty mix of JQuery, TypeScript and CSS.\n\
The jquery definition for typescript comes from <http://definitelytyped.org>\n\
One important thing, the terminal needs the focus to work. If the cursor blinks, everything is alright. If not, click on this text to pass focus to the terminal.";
}

class AvailableCommand {
    commandName: String;
    action: (fullcommand: String, terminal: any) => boolean;
    
    constructor(argCommandName: String, argAction: (fullCommand: String, terminal: any) => boolean) {
        this.commandName = argCommandName;
        this.action = argAction;
    }
}

class CommandCollection {
    commands: Array<AvailableCommand> = new Array<AvailableCommand>();

    addCommand(commandToAdd: AvailableCommand) {
        this.commands.push(commandToAdd);
    }

    callCommand(terminal: any, calledCommand: String): boolean {
        var result = false;
        var command = calledCommand.split(" ", 2)[0];

        this.commands.forEach(function (vc) {
            if (vc.commandName == command) {
                vc.action(calledCommand, terminal);
                result = true;
            }
        }, this);

        if (!result) {
            terminal.echo("command \"" + calledCommand[0] + "\" wasn't found, try \"help\" to see which commands with what kind of arguments are supported right now.\n");
            return false;
        }
        return result;
    }    
}

window.onload = () => {
    myCommands = new CommandCollection();
    //about command for intro.
    myCommands.addCommand(new AvailableCommand("about", function (command,terminal) : boolean {
        terminal.greetings();
        return true;
    }));
    //help command which shows available commands.
    myCommands.addCommand(new AvailableCommand("help", function (command, terminal): boolean {
        terminal.echo(
            "help - shows this help screen.\n" +
            "about - shows the intro information.\n" +
            "clear - clears the terminal of its history\n" +
            "echo - (experimental) returns the arguments to the terminal." +
            "marco - (experimental) testing WCF Service."
            );
        return true;
    }));
    //help command which shows available commands.
    myCommands.addCommand(new AvailableCommand("echo", function (command, terminal): boolean {
        terminal.echo(command);
        return true;
    }));

    //Testing WCF Service.
    myCommands.addCommand(new AvailableCommand("marco", function (calledCommand, terminal): boolean {        
        $.ajax({
            type: "GET",
            url: "Service1.svc/MarcoPolo",
            data: { "command": calledCommand},
            //data: JSON.stringify({ "command": calledCommand }),
            dataType: "json",
            //processData: false

           // complete: marcoComplete,
            //success: marcoSuccess

            // Note: I am unsure how the signature looks for either done nor fail.
        }).done(function (msg,a2,a3) {
                terminal.echo(msg);     
            terminal.echo(JSON.parse(a2));
                //TODO: Add logging for other messages.
          
        }).fail(function (a1,a2,a3) { 
            terminal.echo(a1);
            terminal.echo(a2);
            terminal.echo(a3);
            });
        return true;
    }));
};

//var marcoSuccess = function (data: any, textStatus: String, jqXHR: JQueryXHR) {

//    alert("successfunction");
//    alert(data);
//    alert(jqXHR);
//    alert(textStatus);
//}

//var marcoComplete = function (jqXHR: JQueryXHR, textStatus: String) {

//    alert("completefunction");
//   alert(jqXHR);
//   alert(textStatus);
//}

//var marcoError = function (jqXHR: JQueryXHR, textStatus: String, errorThrown: String) {

//    alert(jqXHR);
//    alert(textStatus);
//    alert(errorThrown);
//}