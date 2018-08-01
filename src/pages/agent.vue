<template>
  <div>
    <my-header></my-header>
    <div class="about-page" ref='kuan'>
      <div class="gua">
        <div class="tou">
          <p style='font-size:18px;color:#333;padding-left:10px;'>
            <!-- ◉ -->加盟合作</p>
        </div>
        <div class="about-content">
          <img v-if="getApiName == 'yiteng'" src="/static/images/yiteng/agent.jpg" height="200" width="1220" alt="">
          <img v-else :src="$getPublicImg('/images/common/join.jpg')" height="200" width="1220" alt="">
          <div class="box" v-if="getApiName === 'ct'">
            <p>作为一名尊贵的{{getName}}联盟合营伙伴，您可以利用您的资源最快赚取高额佣金，从这一秒钟开始，您将可以轻松实现成功与财富的梦想！</p><br>
            <p style='font-size:16px'>联盟方案：</p>
            <p>{{getName}}公司拥有多元化的产品，使用最公平、公正、公开的系统，在市场上的众多博彩网站中，我们自豪的提供会员最优惠的回馈，给予合作伙伴最优势的营利回报! 无论 拥有的是网络资源，或是人脉资源，都欢迎您来加入{{getName}}合作伙伴的行列，无须负担任何费用，就可以开始无上限的收入。 选择{{getName}}，绝对是您最聪明的选择！</p>
            <br>
            <p style='font-size:16px'>代理条件：</p>
            <p>a.具有便利的计算机上网设备。</p>
            <p>b.有一定的人脉资源、网络资源或自己的广告网站。</p>
            <p>c.每期都要有10个实际有效投注的会员以上，如达不到就累积到下期计算佣金！</p>
            <br>
            <p style='font-size:16px'>代理独立平台：</p>
            <p>我们为您提供单独的代理后台，您可以在后台不受限制的开出下线，并且实时了解下线会员输赢，存款，取款情况。代理后台有一个您的专属链接，您可以直接将您的专属链接链接在网站、论坛、博客等等可链接的网络页面，也可在群里面发送您的专属链接，只要通过您的专属链接注册的会员都算是您的下线。推广方式简单方便，推广渠道多种多样。</p>
            <br>
            <p style='font-size:16px'>有效会员：</p>
            <p>月结区间内进行过最少三次充值总额不低于600RMB的会员！如联盟体系当月未达（月最低有效会员）最低门坎10人，则该月无法领取佣金回馈。</p>
            <br>
            <p style='font-size:16px'>底薪收益：</p>
            <p>当月新增10名有效会员（累计充值600元），即可获得保底4000元底薪，连续每月新增10名有效会员，底薪则每月递增500元，最高底薪10000元。</p>
            <br>
            <p style='font-size:16px'>代理收入：</p>
            <p>比如您本月的代理账号内有赢利的情况下，就可拥有以下收入（需扣除10%行政费用）;</p>
            <p>1.一个月内公司在您的代理账号内纯赢利达到100元-50万元，可享受其中30%的佣金。</p>
            <p>2.一个月内公司在您的代理账号内纯赢利达到51万元-100万元，可享受其中35%的佣金。</p>
            <p>3.一个月内公司在您的代理账号内纯赢利达到101万元-300万元，可享受其中40%的佣金。</p>
            <p>4.一个月内公司在您的代理账号内纯赢利达到301万元-1000万元，可享受其中45%的佣金。</p>
            <p>5.一个月内公司在您的代理账号内纯赢利达到1001万元以上，可享受其中50%的佣金。</p>
            <br>
            <p style='font-size:16px'>保底收益： </p>
            <p>为回馈代理商的对本公司的支持，当月代理商在无法获得佣金和底薪的前提下，可享受以下保底待遇：</p>
            <p>1.代理商本期线下有效投注总额大于100万元，将可获保底佣金388元。</p>
            <p>2.代理商本期线下有效投注总额大于200万元，将可获保底佣金888元。</p>
            <p>3.代理商本期线下有效投注总额大于500万元，将可获保底佣金1588元。</p>
            <p>4.代理商本期线下有效投注总额大于1000万元，将可获保底佣金3888元。</p>
            <p>（底薪受益、代理收入、保底收益不能同时领取，选择三者最高发放）</p>
            <br>
            <p style='font-size:16px'>合作规则：</p>
            <p>1.底薪受益和代理收入、保底收益三者选其高进行发放，满足10个有效会员：代理线会员盈利，将直接按照底薪发放；代理线负盈利，可获得的提成高出底薪，将不予计算底薪，按照提成发放。</p>
            <p>2.代理线佣金提成按照会员输赢累计，如第一个月代理线可获佣金为负数，次月按照正数可获佣金抵扣上月负数。</p>
            <p>3.已经在{{getName}}平台上注册的会员不可发展到自己代理线下，代理投注的会员账号，不可出现在自己的代理线下，系统每月自动检测，并人工复核，发现作弊者取消代理资格。 </p>
            <p>4.每月新增会员出现同一姓名，同一IP的注册会员将以1计算有效会员数。 </p>
            <p>5.推荐代理到本公司成为合格有效代理，可获得3000-20000RMB推荐代理奖金！</p><br>
            <h2>【推广地址】</h2>
            作为一名尊贵的{{getName}}合作伙伴，您可以利用您的资源简单赚取高额佣金，轻松实现成功与财富的梦想！
            <br> 推广链接：{{`${$window.location.origin}`}}/#/?promotionId= 此处输入您的代理账号
            <p class="tips">*本公司持有此合作方案的终止权和最终解释权</p>
          </div>

          <div class="box" v-if="getApiName === 'tt'">
            <strong style="color:#000000; font-size:16px;">联盟方案：</strong>
            <p class="STYLE6">{{getName}}拥有多元化的产品，使用最公平、公正、公开的系统，在市场上的众多博彩网站中，我们自豪的提供会员最优惠的回馈，给予合作伙伴最优势的营利回报! 无论 拥有的是网络资源，或是人脉资源，都欢迎您来加入{{getName}}合作伙伴的行列，无须负担任何费用，就可以开始无上限的收入。 选择{{getName}}，绝对是您最聪明的选择!</p>
            <strong style="color:#000000; font-size:16px;">代理条件：</strong>
            <p class="STYLE6">a.具有便利的计算机上网设备。</p>
            <p class="STYLE6">b.有一定的人脉资源、网络资源或自己的广告网站。</p>
            <p class="STYLE6">c.每期都要有5个实际有效投注的会员以上，如达不到就累积到下期计算佣金！</p>
            <strong style="color:#000000; font-size:16px;">有效会员：</strong>
            <p class="STYLE6">月结区间内进行过最少五次有效下注且投注总额不低于1000RMB的会员！ 如联盟体系当月未达﹛月最低有效会员﹜最低门坎5人，则该月无法领取佣金回馈。联盟体系当月营利达到标准，而月最低有效会员人数未达相应最低门坎，则该月佣金累积到下期计算退佣。</p>
            <strong style="color:#000000; font-size:16px;">代理收入：</strong>
            <p class="STYLE6">比如您本月的代理账号内有赢利的情况下，就可拥有以下收入:<br /> 1.一个月内公司在您的代理账号内纯赢利达到1000元-50000元，可享受其中15%的佣金。
              <br /> 2.一个月内公司在您的代理账号内纯赢利达到50001元-100000元，可享受其中20%的佣金。
              <br /> 3.一个月内公司在您的代理账号内纯赢利达到100001元-200000元，可享受其中25%的佣金。
              <br /> 4.一个月内公司在您的代理账号内纯赢利达到200001元-500000元，可享受其中30%的佣金。
              <br /> 5.一个月内公司在您的代理账号内纯赢利达到500001元以上，可享受其中35%的佣金。
              <br />

              <span class="STYLE6"></span>
            </p>
            <strong style="color:#000000; font-size:16px;">推广地址：</strong>
            <p class="STYLE6">
              {{`${$window.location.origin}`}}/#/?promotionId=此处输入您的代理账号
            </p>
            <strong style="color:#000000; font-size:16px;">请注意：</strong>
            <font color=red>＊每位加入合营商的客户，如果您在第一个月的有效会员未达到公司要求，但有产生佣金，您的佣金将累计到下个月。<br /> *注:禁止代理商私自开设会员帐号进行非法投注套利。任何使用不诚实方法骗取代理佣金或下线会员与代理商同IP的我们视为代理商自己开设会员游戏，将取消代理资格并永久冻结账户，佣金一律不予发放。同IP出现多个会员的话，将被视为无效会员，不得计算在内。 敬请联系代理专员QQ：7600096详细洽谈
            </font>
          </div>

          <div class="box" v-if="getApiName === 'gd'">
            <p style='font-size:16px'>联盟方案：</p>
            <h3>光大彩票拥有多元化的产品，使用最公平、公正、公开的系统，在市场上的众多博彩网站中，我们自豪的提供会员最优惠的回馈，给予合作伙伴最优势的营利回报! 无论 拥有的是网络资源，或是人脉资源，都欢迎您来加入光大彩票合作伙伴的行列，无须负担任何费用，就可以开始无上限的收入。 选择光大彩票，绝对是您最聪明的选择!</h3>
            <p style='font-size:16px'>代理条件：</p>
            a.具有便利的计算机上网设备。 <br /> b.有一定的人脉资源、网络资源或自己的广告网站。 <br /> c.每期都要有5个实际有效投注的会员以上，如达不到就累积到下期计算佣金！
            <br />
            <p style='font-size:16px'>独立平台：</p>
            <h3>我们为您提供单独的代理后台，您可以在后台不受限制的开出下线，并且实时了解下线会员输赢，存款，取款情况。代理后台有一个您的专属链接，您可以直接将您的专属链接链接在网站、论坛、博客等等可链接的网络页面，也可在群里面发送您的专属链接，只要通过您的专属链接注册的会员都算是您的下线。推广方式简单方便，推广渠道多种多样。。</h3>
            <p style='font-size:16px'>有效会员：</p>
            <h3>月结区间内进行过最少五次有效下注且投注总额不低于1000RMB的会员！ 如联盟体系当月未达﹛月最低有效会员﹜最低门坎5人，则该月无法领取佣金回馈。联盟体系当月营利达到标准，而月最低有效会员人数未达相应最低门坎，则该月佣金累积到下期计算退佣。</h3>
            <p style='font-size:16px'>代理收入：</p>
            A：比如您本月的代理账号内有赢利的情况下，就可拥有以下收入:<br /> 1.一个月内公司在您的代理账号内纯赢利达到1000元-50000元，可享受其中15%的佣金。
            <br /> 2.一个月内公司在您的代理账号内纯赢利达到50001元-100000元，可享受其中20%的佣金。
            <br /> 3.一个月内公司在您的代理账号内纯赢利达到100001元-200000元，可享受其中25%的佣金。
            <br /> 4.一个月内公司在您的代理账号内纯赢利达到200001元-500000元，可享受其中30%的佣金。
            <br /> 5.一个月内公司在您的代理账号内纯赢利达到500001元以上，可享受其中35%的佣金。
            <br /> 请注意：
            <br />
            <p>＊每位加入合营商的客户，如果您在第一个月的有效会员未达到公司要求，但有产生佣金，您的佣金将累计到下个月。</p>
            <p>*注:禁止代理商私自开设会员帐号进行非法投注套利。任何使用不诚实方法骗取代理佣金或下线会员与代理商同IP的我们视为代理商自己开设会员游戏，将取消代理资格并永久冻结账户，佣金一律不予发放。同IP出现多个会员的话，将被视为无效会员，不得计算在内。 敬请联系代理专员QQ：316333 详细洽谈</p>

            <h2>【推广地址】</h2>
            <br>推广链接：{{`${$window.location.origin}`}}/#/?promotionId=此处输入您的代理账号!
            <p class="tips">*本公司持有此合作方案的终止权和最终解释权</p>
          </div>

          <div class="box" v-if="getApiName === 'sd'">
            <h2>加盟协议</h2>
            <h3>一、668彩票网对代理联盟的权利与义务</h3>
            <p>1.668彩票网的客服部会登记联盟的会员并会观察他们的投注状况。联盟及会员必须同意并遵守668彩票网的会员条例，政策及操作程序。668彩票网保留拒绝或冻结联盟/会员账户权利。</p>
            <p>2. 代理联盟可随时登入接口观察旗下会员的下注状况及会员在网站的活动概况。668彩票网的客服部会根据代理联盟旗下的会员计算所得的佣金。</p>
            <p>3. 668彩票网保留可以修改合约书上的任何条例，包括: 现有的佣金范围、佣金计划、付款程序、及参考计划条例的权力，668彩票网会以电邮、网站公告等方法通知代理联盟。 代理联盟对于所做的修改有异议，代理联盟可选择终止合约，或洽客服人员反映意见。 如修改后代理联盟无任何异议，便视作默认合约修改，代理联盟必须遵守更改后的相关规定。</p>
            <h3>二、代理联盟对668彩票网的权力及义务 </h3>
            <p>1.代理联盟应尽其所能，广泛地宣传、销售及推广668彩票网，使代理本身及668彩票网的利润最大化。代理联盟可在不违反法律下，以正面形象宣传、销售及推广668彩票网，并有责任义务告知旗下会员所有668彩票网的相关优惠条件及产品。 </p>
            <p>2. 代理联盟选择的668彩票网推广手法若需付费，则代理应承担该费用。 </p>
            <p>3. 任何668彩票网相关信息包括: 标志、报表、游戏画面、图样、文案等，代理联盟不得私自复制、公开、分发有关材料，668彩票网保留法律追诉权。如代理在做业务推广有相关需要，请随时洽668彩票网。</p>
            <h3>三、规则条款 </h3>
            <p>1.各阶层代理联盟不可在未经668彩票网许可情况下开设双/多个的代理账号，也不可从668彩票网账户或相关人士赚取佣金。请谨记任何阶层代理不能用代理帐户下注，668彩票网有权终止并封存账号及所有在游戏中赚取的佣金。</p>
            <p>2.为确保所有668彩票网会员账号隐私与权益，668彩票网不会提供任何会员密码，或会员个人资料。各阶层代理联盟亦不得以任何方式取得会员数据，或任意登入下层会员账号，如发现代理联盟有侵害668彩票网会员隐私行为，668彩票网有权取消代理联盟红利，并取消代理联盟账号。</p>
            <p>3. 代理联盟旗下的会员不得开设多于一个的账户。668彩票网有权要求会员提供有效的身份证明以验证会员的身份，并保留以IP判定是否重复会员的权利。如违反上述事项，668彩票网有权终止玩家进行游戏并封存账号及所有于游戏中赚取的佣金 </p>
            <p>4. 代理联盟不可为自己或其他联盟下的有效投注会员,只能是公司直属下的有效投注会员, 代理每月需有3个下线有效投注会员（每月至少上线3次进行正常投注），如有违反联盟协议百668彩票网有权终止并封存账号及所有在游戏中赚取的佣金。 </p>
            <p>5. 如代理联盟旗下的会员因为违反条例而被禁止享用668彩票网的游戏，或668彩票网退回存款给会员，668彩票网将不会分配相应的佣金给代理联盟。如代理联盟旗下会员存款用的信用卡、银行资料须经审核，668彩票网保留相关佣金直至审核完成。</p>
            <p>6. 合约内的条件会以668彩票网通知接受代理联盟加入后开始执行。668彩票网及代理联盟可随时终止此合约，在任何情况下，代理联盟如果想终止合约，都必须以书面/电邮方式提早于七日内通知668彩票网。 代理联盟的表现会3个月审核一次，如代理联盟已不是现有的合作成员则本合约书可以在任何时间终止。如合作伙伴违反合约条例，668彩票网有权立即终止合约。</p>
            <p>7. 在没有668彩票网许可下，代理联盟不能透露及授权668彩票网相关密数据，包括代理联盟所获得的回馈、佣金报表、计算等;代理联盟有义务在合约终止后仍执行机密文件及数据的保密。</p>
            <p>8. 在合约终止后，代理联盟及668彩票网将不须要履行双方的权利及义务。终止合约并不会解除代理联盟于终止合约前应履行的义务。</p>

            <h2>【推广地址】</h2>
            推广链接：{{`${$window.location.origin}`}}/#/?promotionId=此处输入您的代理账号！
            <p class="tips">*本公司持有此合作方案的终止权和最终解释权</p>
          </div>

          <div v-if="getApiName === 'ly'" style='font-size:16px;'>
            <h2> 触手可及的财富 就在您的身边</h2>
            您身边有玩：六合彩、时时彩、北京PK10、广东快乐十分的朋友或者网友，全都是您触手可及的财富，您只要一句话，让您的朋友，网友到我们的网站 le066.com 注册并充值，您就可以获得现金奖励和终身分红。让您轻松月入两万 （可选择：银行转账 支付宝 微信收款，或者直接添加到您自己的会员账户）
            <br>
            <table>
              <caption>奖励方案</caption>
              <tr>
                <td>当月介绍人数</td>
                <td>充值额度</td>
                <td>奖励现金或者会员额度</td>
              </tr>
              <tr>
                <td>1</td>
                <td>100元</td>
                <td> 40元/每人</td>
              </tr>
            </table>
            <br><br>
            <table>
              <caption>分红方案</caption>
              <tr>
                <td>总积累有效人数</td>
                <td>是否配属专用网址</td>
                <td>终身额外分红</td>
              </tr>
              <tr>
                <td>5</td>
                <td>是</td>
                <td>当月盈利的5%</td>
              </tr>
              <tr>
                <td>8</td>
                <td>是</td>
                <td>当月盈利的8%</td>
              </tr>
              <tr>
                <td>10</td>
                <td>是</td>
                <td>当月盈利的10%</td>
              </tr>
              <tr>
                <td>20</td>
                <td>是</td>
                <td>当月盈利的20%</td>
              </tr>
            </table> <br> &nbsp;&nbsp;&nbsp;&nbsp;不需要每天不停的工作，也不需要跟机器一样不停的运转，每个月只需新增10个有效会员 则可以获得额外1600元保底薪资（即 150元/每人*10个以上新增会员个数+1600元保底薪资=获得奖励 ）
            <br> &nbsp;&nbsp;&nbsp;&nbsp;当当月的额外分红 大于等于 获得奖励时则按当月的额外分红派发分红，当当月的额外分红小于获得奖励时则按照 获得奖励 派发）积累总数达到5人的配属专用的推广网址享受终身分红（所获分红对应上表所列信息），从此成就您的辉煌人生。（有效会员必须注册并充值满100元以上）
            <br> &nbsp;&nbsp;&nbsp;&nbsp;我们提供QQ群服务，您可以加入我们的QQ群310047621，来交流讨论，学习如何让您赚到更多的钱，您有好的建议，也可以跟我们提出议案，经采纳后我们将给予丰厚报酬。QQ群：310047621
            <br> &nbsp;&nbsp;&nbsp;&nbsp;QQ群有公司网站专业人员一对一指导教学及时沟通，实现快速注册，充值赚取现金奖励 ，周边朋友 ，社交软件，大型论坛、百度贴吧等一些人流量较多的地方开始实行，付出就收获，让您轻松月入两万，从此与众不同。
            <br> 咨询联系QQ：339855 无门槛、高回报、出就收获，让您轻松月入两万，从此与众不同。

            <br>
            <h2>【推广地址】</h2>
            作为一名尊贵的乐盈彩票网合作伙伴，您可以利用您的资源简单赚取高额佣金，轻松实现成功与财富的梦想！
            <br>推广链接：{{`${$window.location.origin}`}}/#/?promotionId= 此处输入您的代理账号
            <p class="tips">*本公司持有此合作方案的终止权和最终解释权</p>
          </div>

          <div class="box" v-if="getApiName === 'yiteng'||getApiName === 'letian'||getApiName === 'ylh'||getApiName === '618cp'||getApiName === 'fulicai'||getApiName === 'yile'||getApiName === 'uc'||getApiName === 'agcai'||getApiName == 'yiren'">
            <p style='font-size:16px'>联盟方案：</p>
            <h2>【加盟方案】</h2>
            <h3>{{getName}},全网独家全新代理，火爆来袭</h3>
            1.零成本，零风险，高回报。<br> 2.双重收益，日收入万元不是梦。
            <br> 3.无需等待，无需担心，佣金快速到账。
            <br> {{getName}}为广大所有客户免费提供赚钱平台，只要您成为我们的代理，只要您拥有人脉或用心推广，发展线下，无需任何操作，也不会占用您太多时间，更不用担心线下输赢，您都可以坐等赚钱。
            <br> 您只需要加下面的QQ，就能开始您的财富之路。
            <br>

            <h4>一、{{getName}}对代理联盟的权利与义务</h4>
            1.{{getName}}的客服部会登记联盟的会员并会观察他们的投注状况。联盟及会员必须同意并遵守{{getName}}的会员条例，政策及操作程序。{{getName}}保留拒绝或冻结联盟/会员账户权利。<br> 2. 代理联盟可随时登入接口观察旗下会员的下注状况及会员在网站的活动概况。{{getName}}的客服部会根据代理联盟旗下的会员计算所得的佣金。<br> 3. {{getName}}保留可以修改合约书上的任何条例，包括: 现有的佣金范围、佣金计划、付款程序、及参考计划条例的权力，{{getName}}会以电邮、网站公告等方法通知代理联盟。 <br>代理联盟对于所做的修改有异议，代理联盟可选择终止合约，或洽客服人员反映意见。 <br>如修改后代理联盟无任何异议，便视作默认合约修改，代理联盟必须遵守更改后的相关规定。<br>

            <h4>二、代理联盟对{{getName}}的权力及义务 </h4>
            1.代理联盟应尽其所能，广泛地宣传、销售及推广{{getName}}，使代理本身及{{getName}}的利润最大化。代理联盟可在不违反法律下，以正面形象宣传、销售及推广{{getName}}，并有责任义务告知旗下会员所有{{getName}}的相关优惠条件及产品。 <br> 2. 代理联盟选择的{{getName}}推广手法若需付费，则代理应承担该费用。 <br> 3. 任何{{getName}}相关信息包括: 标志、报表、游戏画面、图样、文案等，代理联盟不得私自复制、公开、分发有关材料，{{getName}}保留法律追诉权。如代理在做业务推广有相关需要，请随时洽{{getName}}。<br>

            <h4>三、规则条款 </h4>
            1.各阶层代理联盟不可在未经{{getName}}许可情况下开设双/多个的代理账号，也不可从{{getName}}账户或相关人士赚取佣金。请谨记任何阶层代理不能用代理帐户下注，{{getName}}有权终止并封存账号及所有在游戏中赚取的佣金。<br> 2.为确保所有{{getName}}会员账号隐私与权益，{{getName}}不会提供任何会员密码，或会员个人资料。各阶层代理联盟亦不得以任何方式取得会员数据，或任意登入下层会员账号，如发现代理联盟有侵害{{getName}}会员隐私行为，{{getName}}有权取消代理联盟红利，并取消代理联盟账号。
            <br> 3. 代理联盟旗下的会员不得开设多于一个的账户。{{getName}}有权要求会员提供有效的身份证明以验证会员的身份，并保留以IP判定是否重复会员的权利。如违反上述事项，{{getName}}有权终止玩家进行游戏并封存账号及所有于游戏中赚取的佣金 <br> 4. 代理联盟不可为自己或其他联盟下的有效投注会员,只能是公司直属下的有效投注会员, 代理每月需有3个下线有效投注会员（每月至少上线3次进行正常投注），如有违反联盟协议{{getName}}有权终止并封存账号及所有在游戏中赚取的佣金。<br> 5. 如代理联盟旗下的会员因为违反条例而被禁止享用{{getName}}的游戏，或{{getName}}退回存款给会员，{{getName}}将不会分配相应的佣金给代理联盟。如代理联盟旗下会员存款用的信用卡、银行资料须经审核，{{getName}}保留相关佣金直至审核完成。<br> 6. 合约内的条件会以{{getName}}通知接受代理联盟加入后开始执行。{{getName}}及代理联盟可随时终止此合约，在任何情况下，代理联盟如果想终止合约，都必须以书面/电邮方式提早于七日内通知{{getName}}。 代理联盟的表现会3个月审核一次，如代理联盟已不是现有的合作成员则本合约书可以在任何时间终止。如合作伙伴违反合约条例，{{getName}}有权立即终止合约。 <br> 7. 在没有{{getName}}许可下，代理联盟不能透露及授权{{getName}}相关密数据，包括代理联盟所获得的回馈、佣金报表、计算等;代理联盟有义务在合约终止后仍执行机密文件及数据的保密。 <br> 8. 在合约终止后，代理联盟及{{getName}}将不须要履行双方的权利及义务。终止合约并不会解除代理联盟于终止合约前应履行的义务。<br>

            <h2>【推广地址】</h2>
            作为一名尊贵的{{getName}}合作伙伴，您可以利用您的资源简单赚取高额佣金，轻松实现成功与财富的梦想！
            <br> {{`${$window.location.origin}`}}/#/?promotionId=此处输入您的代理账号
            <br><br>

            <p class="tips">*本公司持有此合作方案的终止权和最终解释权</p>
          </div>

        </div>
        <div v-if="getApiName === 'yiren'||getApiName === 'tt'" style="background:#862C41" class="daili" @click='showReg'>代理注册</div>
        <div v-else class="daili" @click='showReg'>代理注册</div>
        &nbsp;&nbsp;&nbsp;&nbsp;已有账号？
        <a href="//ag.uc22.com" target="_blank" class="btn-agent" v-if="getApiName === 'uc'">代理登录</a>
        <a href="//ag.caitou01.com" target="_blank" class="btn-agent" v-if="getApiName === 'ct'">代理登录</a>
        <a href="//ag.gdcp99.com" target="_blank" class="btn-agent" v-if="getApiName === 'gd'">代理登录</a>
        <a href="//ag.ca668.com/" target="_blank" class="btn-agent" v-if="getApiName === 'sd'">代理登录</a>
        <a href="//ag.le658.com" target="_blank" class="btn-agent" v-if="getApiName === 'ly'">代理登录</a>
        <a href="//ag.yrcai.com/" target="_blank" class="btn-agent" v-if="getApiName === 'yiren'">代理登录</a>
        <a href="http://ag.ag11111.cc" target="_blank" class="btn-agent" v-if="getApiName === 'agcai'">代理登录</a>
        <a href="http://ag.163774.com/" target="_blank" class="btn-agent" v-if="getApiName === 'yile'">代理登录</a>
        <a href="http://ag.hga0004.com " target="_blank" class="btn-agent" v-if="getApiName === 'crown'">代理登录</a>
        <a href="http://ag.fuli520.vip/" target="_blank" class="btn-agent" v-if="getApiName === 'fulicai'">代理登录</a>
        <a href="http://ag.618cpcp.com/" target="_blank" class="btn-agent" v-if="getApiName === '618cp'">代理登录</a>
        <a href="http://ag.ylh108.com/" target="_blank" class="btn-agent" v-if="getApiName === 'ylh'">代理登录</a>
        <a href="http://ag.yycpcom2.com" target="_blank" class="btn-agent" v-if="getApiName === 'yy'">代理登录</a>
        <a href="http://ag.yt556.com/" target="_blank" class="btn-agent" v-if="getApiName === 'yiteng'">代理登录</a>
        <a href="//ag.lt268.com/" target="_blank" class="btn-agent" v-if="getApiName === 'letian'">代理登录</a>
        <register v-if="isShowReg" v-on:doClose="listenCloseOrder" v-on:loginType="listenLoginType"></register>
      </div>
    </div>
  </div>
</template>


<script>
import myHeader from "../components/hgHeader";
import Register from "../components/Account/register";
export default {
  data() {
    return {
      getApiName: getApiName(),
      isShowReg: false,
      daili: false,
      getName:''
    };
  },
  components: {
    myHeader,
    Register
  },
  created() {
    switch (this.getApiName) {
      case 'tt':
        this.getName = '天天彩票网'
        break;
      case 'ct':
        this.getName = '彩投网'
        break;
      case 'yiren':
        this.getName = '亿人彩票网'
        break;
      case 'agcai':
        this.getName = 'AG彩票网'
        break;
      case 'uc':
        this.getName = 'UC彩票网'
        break;
      case 'yile':
        this.getName = 'e乐彩票网'
        break;
      case 'fulicai':
        this.getName = '福利彩票网'
        break;
      case '618cp':
        this.getName = '618彩票网'
        break;
      case 'ylh':
        this.getName = '永利会彩票网'
        break;
      case 'yiteng':
        this.getName = '亿腾彩票网'
        break;
      case 'yy':
        this.getName = 'yy彩票网'
        break;
      case 'letian':
        this.getName = '乐天彩票网'
        break;
      default:
        break;
    }
    this.$nextTick(() => {
      if (sessionStorage.getItem("im_onf")) {
        // alert(sessionStorage.getItem('im_onf'))

        this.$refs.kuan.style = "padding-left: 20px ;padding-right:20px;";
      }
    });
  },
  methods: {
    closeDialog() {
      this.isShowLogin = false;
      this.isShowReg = false;
      this.isShowResetPwd = false;
      this.daili = false;
      sessionStorage.setItem("im_isAgent", this.daili);
    },
    listenCloseOrder: function(i) {
      if (i === "close") {
        this.closeDialog();
        // closeDialog
        this.isShowChangePwd = false;
        this.isShowChangePayPwd = false;
        this.daili = false;
        sessionStorage.setItem("im_isAgent", this.daili);
      }
      if (i === "sucess") {
        this.closeDialog();
      }
      // if (i === "showAgree") {
      //   this.isShowAgreement = true
      // }
    },
    listenLoginType(i) {
      if (i === "reg") {
        this.isShowReg = true;
        this.isShowLogin = false;
      }
    },
    showReg() {
      // console.log(2)
      this.daili = true;
      sessionStorage.setItem("im_isAgent", this.daili);
      this.isShowReg = true;
    }
  }
};
</script>

<style scoped>
p {
  color: #666;
}
.about-content {
  text-align: left;
  /*width: 800px;*/
  /*margin:0 auto;*/
  padding: 20px 0px;
  font-size: 14px;
  line-height: 30px;
  color: #333;
}
.about-page {
  width: 1260px;
  margin: 0 auto;
  animation-duration: 0.5s;
  transition: all ease 0.5s;
  animation-name: fadeInRight1;
  padding: 70px 0 0 0px;
  /*background: #fff;*/
  /*height: calc(100vh - 100px)!important;*/
  /*overflow-y: auto;*/
}
.tou {
  text-align: left;
  line-height: 40px;
  height: 40px;
  border-bottom: 2px solid #dfe4ed;
}
.gua {
  background: #fff;
  padding: 10px 20px;
  /*height: calc(100vh - 140px)!important;*/
  overflow-y: auto;
  color: #666;
}
.daili {
  /*width: 800px;*/
}
.daili {
  display: inline-block;
  width: 150px;
  line-height: 50px;
  color: #fff;
  font-size: 18px;
  height: 50px;
  background: #2866b4;
  border-radius: 5px;
  margin: 30px auto;
  cursor: pointer;
}
.tips {
  font-size: 12px;
  color: red;
}
.about-content h2 {
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
}
.about-content h4 {
  font-size: 16px;
  margin-top: 25px;
  color: #000;
}
.btn-agent {
  text-decoration: underline;
  margin: 0 0 0 0;
  font-size: 16px;
  color: #2866b4;
}
.btn-agent:hover {
  color: #000;
}
table,
tr,
td,
caption {
  border: 1px solid #f4b083;
}
td {
  padding: 2px 10px;
}
</style>
