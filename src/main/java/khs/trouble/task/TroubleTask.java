/*
 * Copyright 2015 Keyhole Software LLC.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

package khs.trouble.task;

import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import khs.trouble.service.impl.EventService;
import khs.trouble.service.impl.TroubleService;

@Component
public class TroubleTask {

	Logger LOG = Logger.getLogger(TroubleTask.class.getName());

	@Autowired
	TroubleService service;

	@Autowired
	EventService eventService;

	@Value("${auto.kill.enabled:true}")
	boolean autoKillEnabled;

	@Value("${trouble.token}")
	String token;

	@Scheduled(cron = "${trouble.cron:0 0 14 * * MON-FRI}")
	public void applyTrouble() {
		if (autoKillEnabled) {
			service.randomKill(token);
		}
	}
}
