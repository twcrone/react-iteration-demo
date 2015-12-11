angular.module("MailboxApp",['ui.router'])
.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/inbox");
    $stateProvider
    .state('inbox', {
        url: "/inbox",
        templateUrl: "partials/inbox.html",
        controller:function($scope,messageStore,$element,$filter){
            
        var MessageList = React.createClass({
            render:function(){
                return (
                    <div>
                        <h2>
                        {this.props.messages.length} Unread Messages
                        </h2>
                        <table>
                    
                        <thead>
                           <th>
                               Sender
                           </th>
                           <th>
                            
                               Subject
                            
                           </th>
                           <th>
                               Date
                           </th>
                       </thead>
                            
                        {this.props.messages.map(function(m,i){
                            return (
                                <tr key={i}>
                                    <td>
                                        {m.sender}
                                    </td>
                                    <td>
                                        <a href={"/#/message/"+i}>
                                        {m.subject}
                                        </a>
                                    </td>
                                    <td>
                                        {$filter('date')(m.date)}
                                    </td>
                                </tr>
                                
                            );
                        })}
                        </table>
                    </div>
                )
            }
        });
            
        var messages = messageStore.getMessages();
            
        React.render(<MessageList messages={messages}/>, $element[0]);
        }
    })   
    .state('message', {
        url: "/message/:id",
        templateUrl: "partials/message.html",
        controller:function($scope,messageStore,$stateParams){
            $scope.message = messageStore.getMessages().filter(function(m){
                return m.id == $stateParams.id;
            })[0];
            
        }
    })   
})
.service("messageStore",function(){
    var messages = [];
    // at 100 it's fine
    // at 1000 its a little buggy
    // at 10000 its all over
    var sampleSize = 10000;
    for (var i = 0; i < sampleSize; i++){
        messages.push({
            sender:`john.smith${i}@gmail.com`,
            date:Date.now() - i*240000000,
            id:i,
            subject:`Regarding report DS-${i}`,
            body:`Where's that report? I've been waiting ${i} days now.`
        })
    };
    return {
        getMessages:function(){
            return messages;
        }
    }
})