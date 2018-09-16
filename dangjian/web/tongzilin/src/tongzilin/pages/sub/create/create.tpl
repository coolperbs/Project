<div class="w-p-sub-create">
	<div class="head">
		<div class="title">项目申报</div>
	</div>
	<div class="cont J_Cont">
	</div>
	<div class="act form"> 
		<div class="btn primary J_Submit">提交</div>
	</div>
	<script class="J_ContTemp" type="text/html">
		<div class="form">
			<form class="J_Form">
			<div class="row">
				<div class="cell">
					<div class="key">姓名</div>
					<div class="value">
						<input name="userName" data-name="姓名" type="text"/>
					</div>
				</div>
				<div class="cell">
					<div class="key">手机号</div>
					<div class="value">
						<input name="userPhone" maxlength="11" data-name="手机号" type="text"/>
					</div>
				</div>
			</div>	
			<div class="row">
				<div class="cell">
					<div class="key">项目名称</div>
					<div class="value">
						<input name="name" data-name="项目名称" type="text"/>
					</div>
				</div>
				<div class="cell">
					<div class="key">是否公开</div>
					<div class="value">
						<select name="publiced">
							<option value="1">公开</option>
							<option value="2">不公开</option>
						</select>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="cell">
					<div class="key">项目描述</div>
					<div class="value">
						<textarea name="desc" data-name="项目描述" rows="3"></textarea>
					</div>
				</div>
			</div>
			<div class="row half">
				<div class="cell">
					<div class="key">附件</div>
					<div class="value">
						<input type="file" data-name="uploadFile" class="J_File">
						<input type="hidden" name="attachUrl" class="J_AttachUrl"/>
						<!--<span class="file">
							请选择文件
						</span>-->
					</div>
				</div>
			</div>
			</form>
		</div>
	</script>
</div>